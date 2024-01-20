import input from 'input';
import { Api, TelegramClient } from 'telegram';
import { TAdvertiseMessage } from '../advertise-messages';
import { MAX_MESSAGES_BEFORE_ADVERTISE, MAX_TIME_TO_WAITING_FOR_SIGNAL } from '../constants';
import { TDestinationListData } from '../destination-list';
import { howToTradeMessages } from '../how-to-trade-messages';
import { findChannelBySignal, setChannelWaitingForSignal } from './handle-channels';

type TMessage = {
  message: string,
}

export type TMakeCounter = ReturnType<typeof makeCounter>;

const { 
	increment: incrementHowToTradeMessageIndex,
	reset: resetHowToTradeMessageIndex,
	value: getHowToTradeMessageIndexValue,
} = makeCounter();

async function listContacts(client: TelegramClient) {
	try {

		const apiContacts = await client.invoke(
			new Api.contacts.GetContacts({})
		) as unknown as { users: Api.User[]};


		const contacts = apiContacts?.users?.map((user) => ({
			firstName: user.firstName,
			phone: user.phone,
			id: parseInt(String(user.id))
		}));

		return contacts;

	} catch (error) {
		console.log(error);
		return [];
	}
}

async function initialSetup(client: TelegramClient) {
	await client.start({
		phoneNumber: async () => await input.text('Please enter your number: '),
		password: async () => await input.text('Please enter your password: '),
		phoneCode: async () =>
			await input.text('Please enter the code you received: '),
		onError: (err) => console.log(err),
	});
	console.log('You should now be connected.');
	console.log(client.session.save());

}

async function listDialogs(client: TelegramClient) {
	const apiDialogs = await client.getDialogs();

	const dialogs = apiDialogs.map((d) => ({
		type: d?.entity?.className,
		id: d?.entity?.id,
		name: (
			(d.entity?.className === 'Chat' || d?.entity?.className === 'Channel')
				? d.entity.title
				: (d.entity?.className === 'User') ? d?.entity?.firstName : 'N/A'
		)
	}));

	return dialogs;
}

async function sendMessagesToDestinationList(client: TelegramClient, messageObj: TMessage, destinationListArray: TDestinationListData[]) {
	const promises = destinationListArray.map((dest) => client.sendMessage(dest.id, messageObj));
	try {
		await Promise.all(promises);		
	} catch (error) {
		console.log(error);				
	}
}

async function sendAdvertiseMessageToDestinationList(client: TelegramClient, destinationListArray: TDestinationListData[], advertiseMessages: TAdvertiseMessage) {  
	const { increment: incrementIndex, reset: resetIndex, value: indexValue } = advertiseMessages.messagesIndexController;
	const { messages } = advertiseMessages;

	if(indexValue() >= messages.length) {
		resetIndex();
	}

	const currentMessage = messages[indexValue()];
	incrementIndex();

	const promises = destinationListArray.map((dest) => client.sendMessage(dest.id, currentMessage));
	try {
		await Promise.all(promises);		
	} catch (error) {
		console.log(error);
	}
}

async function sendHowToTradeMessageToDestinationList(client: TelegramClient, destinationListArray: TDestinationListData[]) {
	if(getHowToTradeMessageIndexValue() >= howToTradeMessages.length) {
		resetHowToTradeMessageIndex();
	}

	const currentMessage = howToTradeMessages[getHowToTradeMessageIndexValue()];   
	const promises = destinationListArray.map((dest) => client.sendMessage(dest.id, currentMessage));
	await Promise.all(promises);
	incrementHowToTradeMessageIndex();
}

async function sendMandatoryMessage(client: TelegramClient, destinationListArray: TDestinationListData[]) {
	const msgOb = {
		message: '🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n' +
    '\n' +
    '\n' +
    '⚠️ ATENÇÃO ‼️\n' +
    '\n' +
    '\n' +
    'Teremos um novo sinal a qualquer momento📉📈\n' +
    '\n' +
    '👀 👀👉 ESTEJAM ATENTOS! 👀 👀',
	};

	const promises = destinationListArray.map((dest) => client.sendMessage(dest.id, msgOb));
	await Promise.all(promises);
}

function makeCounter() {
	let count = 0;
	return Object.freeze({
		value: () => count,
		increment: () => count++,
		reset: () => count = 0,
	});
}

function makeSignalTimeout() {
	let signalTimeout: NodeJS.Timeout | null = null;
	function clearSignalTimeout() {
		if (signalTimeout) clearTimeout(signalTimeout);
		return signalTimeout = null;
	}

	function createSignalTimeout() {
		return signalTimeout = setTimeout(() => {
			console.log('reset signal');
			const channelBySignal = findChannelBySignal(true);
			if (channelBySignal) setChannelWaitingForSignal(channelBySignal.id, false);
			clearSignalTimeout();
		}, MAX_TIME_TO_WAITING_FOR_SIGNAL);
	}

	return Object.freeze({
		createSignalTimeout,
		clearSignalTimeout,
		get: () => signalTimeout,
	});
}

function makeIsSendingMessage() {
	let isSendingMessage = false;
	return Object.freeze({
		set: (isSending: boolean) => isSendingMessage = isSending,
		get: () => isSendingMessage,
	});
}

function isBreakTime() {
	const formattedTime = Intl.DateTimeFormat('pt-br', {
		hour: '2-digit',
		timeZone: 'America/Sao_Paulo',
	});

	const hours = Number(formattedTime.format(new Date()));
	return (hours >= 19 && hours < 22);
}

function applyFunctionAsync<T, R>(
	array: T[],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	func: (...args: any[]) => R,
	...params: Parameters<typeof func>
): Promise<R[]> {
	return new Promise((resolve, reject) => {
		try {
			const resultArray: R[] = array.map((item) => func(...params, item));
			resolve(resultArray);
		} catch (error) {
			reject(error);
		}
	});
}

function filterFreeChannels(destinationListArray: TDestinationListData[], filter: boolean) {
	if(filter) return destinationListArray.filter((list) => list.classification !== 'Free');
	return destinationListArray;
}

function handleMsgCount(destinationListArray: TDestinationListData[][]) {
	for (const destinationItem of destinationListArray) {
		for (const { msgCounter } of destinationItem) {
			if(msgCounter.value() < MAX_MESSAGES_BEFORE_ADVERTISE) {
				msgCounter.increment();				
			}		
		}		
	}
}

async function handleSendAdvertiseMessage(client: TelegramClient, advertiseMessages: TAdvertiseMessage, destinationListArray: TDestinationListData[]) {
	for (const { msgCounter } of destinationListArray) {
		if(msgCounter.value() >= MAX_MESSAGES_BEFORE_ADVERTISE) {
			await sendAdvertiseMessageToDestinationList(client, destinationListArray, advertiseMessages);
			msgCounter.reset();
		}
	}		
}

export {
	applyFunctionAsync, filterFreeChannels, handleMsgCount, handleSendAdvertiseMessage, initialSetup, isBreakTime, listContacts, listDialogs, makeCounter, makeIsSendingMessage, makeSignalTimeout, sendAdvertiseMessageToDestinationList,
	sendHowToTradeMessageToDestinationList, sendMandatoryMessage, sendMessagesToDestinationList
};

