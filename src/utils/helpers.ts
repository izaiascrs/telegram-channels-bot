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

export async function listContacts(client: TelegramClient) {
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

export async function initialSetup(client: TelegramClient) {
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

export async function listDialogs(client: TelegramClient) {
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

export async function sendMessagesToDestinationList(client: TelegramClient, messageObj: TMessage, destinationListArray: TDestinationListData[]) {
	const replaceBroker = (mixedChannel: boolean, msg: string) => {
		if(mixedChannel === true) return ({ message: msg });
		return ({
			message: msg.replace(/🏛️.*?\n{1,3}/g, ''),
		});		 
	};

	const promises = destinationListArray.map((dest) => client.sendMessage(dest.id, replaceBroker(dest.mixedChannel, messageObj.message)));
	try {
		await Promise.all(promises);		
	} catch (error) {
		console.log(error);				
	}
}

export async function sendAdvertiseMessageToDestinationList(client: TelegramClient, destItem: TDestinationListData, advertiseMessages: TAdvertiseMessage) {  
	const { increment: incrementIndex, reset: resetIndex, value: indexValue } = destItem.advertiseMsgIndexController;
	const { messages } = advertiseMessages;

	if(indexValue() >= messages.length) {
		resetIndex();
		console.log('reset value');		
	}

	const currentMessage = messages[indexValue()];
	incrementIndex();

	try {
		await client.sendMessage(destItem.id, currentMessage);
	} catch (error) {
		console.log(error);
	}
}

export async function sendHowToTradeMessageToDestinationList(client: TelegramClient, destinationListArray: TDestinationListData[]) {
	if(getHowToTradeMessageIndexValue() >= howToTradeMessages.length) {
		resetHowToTradeMessageIndex();
	}

	const currentMessage = howToTradeMessages[getHowToTradeMessageIndexValue()];   
	const promises = destinationListArray.map((dest) => client.sendMessage(dest.id, currentMessage));
	await Promise.all(promises);
	incrementHowToTradeMessageIndex();
}

export async function sendMandatoryMessage(client: TelegramClient, destinationListArray: TDestinationListData[]) {
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

export function makeCounter() {
	let count = 0;
	return Object.freeze({
		value: () => count,
		increment: () => count++,
		reset: () => count = 0,
	});
}

export function makeSignalTimeout() {
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

export function makeIsSendingMessage() {
	let isSendingMessage = false;
	return Object.freeze({
		set: (isSending: boolean) => isSendingMessage = isSending,
		get: () => isSendingMessage,
	});
}

export function isBreakTime(date?: Date) {
	const currentDate = date || changeTimeZone(new Date(), 'America/Sao_Paulo');	
	const hours = Number(currentDate.getHours());
	return (hours >= 19 && hours < 22);
}

export function isFreeChannelWorkingTime(date?: Date) {
	const currentDate = date || changeTimeZone(new Date(), 'America/Sao_Paulo');	
	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();
	const allowedHours = (hours >= 0 && hours <= 15);
	const allowedHoursMinutes = hours === 15 ? minutes < 30 : true;
	return (allowedHours && allowedHoursMinutes);
}

export function applyFunctionAsync<T, R>(
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

export function filterFreeChannels(destinationListArray: TDestinationListData[], filter: boolean) {
	if(filter) return destinationListArray.filter((list) => list.classification !== 'Free');	
	const filtered = destinationListArray.filter((list) => { 
		if(list.classification === 'Vip') return true;
		if(list.hasWorkingTime === false) return true;		
		if(list.hasWorkingTime && isFreeChannelWorkingTime()) return true;
		return false;		
	});	
	return filtered;
}

export function handleMsgCount(destinationListArray: TDestinationListData[][]) {
	for (const destinationItem of destinationListArray) {		
		for (const { msgCounter } of destinationItem) {			
			if(msgCounter.value() < MAX_MESSAGES_BEFORE_ADVERTISE) {
				msgCounter.increment();				
			}		
		}		
	}
}

export async function handleSendAdvertiseMessage(client: TelegramClient, advertiseMessages: TAdvertiseMessage, destinationListArray: TDestinationListData[]) {
	for await (const destItem of destinationListArray) {
		if(destItem.msgCounter.value() >= destItem.advertiseMsgCount) {
			await sendAdvertiseMessageToDestinationList(client, destItem, advertiseMessages);
			destItem.msgCounter.reset();
		}
	}
}

export function changeTimeZone(date: Date | string, timeZone: string) {
	if (typeof date === 'string') {
		return new Date(
			new Date(date).toLocaleString('en', {
				timeZone,
			}),
		);
	}

	return new Date(
		date.toLocaleString('en', {
			timeZone,
		}),
	);
}


