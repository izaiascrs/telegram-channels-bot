import { Api, TelegramClient } from 'telegram';
import { NewMessage, NewMessageEvent } from 'telegram/events';

import {
	communityOfTradersDestinationListIds, topTradersDestinationListIds
} from './destination-list';

import {
	applyFunctionAsync,
	filterFreeChannels,
	handleMsgCount,
	handleSendAdvertiseMessage,
	isBreakTime,
	makeCounter,
	makeIsSendingMessage,
	makeSignalTimeout,
	sendHowToTradeMessageToDestinationList,
	sendMandatoryMessage,
	sendMessagesToDestinationList
} from './utils/helpers';

import {
	checkIfMessageHasSignal,
	checkIfSignalMessageIsCallOrPut,
	checkIfStickIsCallOrPut,
	createNewSignalMessage,
	createTradeSignalMessage,
	extractDataFromEspecialChannelMessage,
	extractDataFromMessage,
	extractDataFromMessageEvent,
	isSticker,
	isValidMessage,
} from './utils/handle-message';

import {
	checkIfMessageIsFromDifferentChannel,
	findChannelById,
	findChannelBySignal,
	isEspecialChannel,
	setChannelWaitingForSignal,
} from './utils/handle-channels';

import {
	communityOfTradersAdvertiseMessages,
	topTraderTradersAdvertiseMessages
} from './advertise-messages';

import {
	MAX_MESSAGES_BEFORE_FREE_CHANNEL,
	MAX_MESSAGES_BEFORE_HOW_TO_TRADE_MESSAGE,
	STRING_SESSION,
	TELEGRAM_API_HASH,
	TELEGRAM_API_ID
} from './constants';

const {
	set: setIsSendingMessage,
	get: getIsSendingMessage,
} = makeIsSendingMessage();

const {
	clearSignalTimeout,
	createSignalTimeout,
	get: getSignalTimeout,
} = makeSignalTimeout();

const {
	increment: incrementHowToTradeMsgCount,
	reset: resetHowToTradeMsgCount,
	value: msgCountToHowToTradeValue,
} = makeCounter();

const {
	increment: incrementAllMsgCount, 
	reset: resetAllMsgCount,
	value: getAllMsgCount,
} = makeCounter();

const client = new TelegramClient(
	STRING_SESSION,
	TELEGRAM_API_ID,
	TELEGRAM_API_HASH,
	{ connectionRetries: 5 },
);


(async () => {
	await client.connect();
	await client.getDialogs();

	client.addEventHandler(messageHandler, new NewMessage({}));

	async function messageHandler(event: NewMessageEvent) {
		if(isBreakTime()) return;

		const messageData = extractDataFromMessageEvent(event);

		const allDestinationList = [
			filterFreeChannels(communityOfTradersDestinationListIds, getAllMsgCount() < MAX_MESSAGES_BEFORE_FREE_CHANNEL),
			filterFreeChannels(topTradersDestinationListIds, getAllMsgCount() < MAX_MESSAGES_BEFORE_FREE_CHANNEL)
		];

		if (messageData.isChannel === false) return;

		const channelById = findChannelById(messageData.chatId);
		const channelBySignal = findChannelBySignal(true);
		
		if (!channelById) return;

		if (checkIfMessageIsFromDifferentChannel(channelById, channelBySignal)) return;

		if (isValidMessage(messageData.message)) {

			if (channelBySignal?.waitingForSignal && getIsSendingMessage() === false) {
				const signal = checkIfMessageHasSignal(messageData.message);

				if (signal?.length) {
					setIsSendingMessage(true);
					const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
					const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
					const messageObj = { message: CALL_PUT_MESSAGE };

					await Promise.all(await applyFunctionAsync(
						allDestinationList,
						sendMessagesToDestinationList,
						client, messageObj
					)).catch(err => console.log(err));

					await Promise.all(await applyFunctionAsync(
						allDestinationList,
						sendMandatoryMessage,
						client
					)).catch(err => console.log(err));

					setChannelWaitingForSignal(channelById.id, false);
					clearSignalTimeout();

					handleMsgCount(allDestinationList);					
					incrementHowToTradeMsgCount();
					incrementAllMsgCount();

					if(getAllMsgCount() > MAX_MESSAGES_BEFORE_FREE_CHANNEL) resetAllMsgCount();

					await handleSendAdvertiseMessage(client, communityOfTradersAdvertiseMessages, communityOfTradersDestinationListIds);
					await handleSendAdvertiseMessage(client, topTraderTradersAdvertiseMessages, topTradersDestinationListIds);

					if (msgCountToHowToTradeValue() === MAX_MESSAGES_BEFORE_HOW_TO_TRADE_MESSAGE) {
						await sendHowToTradeMessageToDestinationList(client, communityOfTradersDestinationListIds);
						resetHowToTradeMsgCount();
					}

					setIsSendingMessage(false);
				}
			} else if (getIsSendingMessage() === false) {
				const { currencyPair, time, hours } = isEspecialChannel(messageData.chatId)
					? extractDataFromEspecialChannelMessage(messageData.message)
					: extractDataFromMessage(messageData.message);

				if (currencyPair.length && time.length) {
					let signal: RegExpExecArray | null = null;

					if (hours.length > 0) {
						signal = checkIfMessageHasSignal(messageData.message);
					}

					const channelName = channelById.name;
					const signalMessage = createNewSignalMessage({
						currencyPair, time, hours, signal, channelName,
					});
					
					const messageObj = { message: signalMessage };

					if (signal === null || hours.length === 0) {
						setChannelWaitingForSignal(channelById.id, true);
						createSignalTimeout();
						
						await Promise.all(await applyFunctionAsync(
							allDestinationList,
							sendMessagesToDestinationList,
							client, messageObj
						)).catch(err => console.log(err));
					}

					const hasPairTimeAndSignal = ((currencyPair.length) && (time.length) && (hours.length) && (signal?.length));
					const isMessageWithSignal = (hasPairTimeAndSignal && (getIsSendingMessage() === false));

					if (isMessageWithSignal) {						
						handleMsgCount(allDestinationList);
						incrementHowToTradeMsgCount();
						incrementAllMsgCount();
						
						setIsSendingMessage(true);

						await Promise.all(await applyFunctionAsync(
							allDestinationList,
							sendMessagesToDestinationList,
							client, messageObj
						));

						await Promise.all(await applyFunctionAsync(
							allDestinationList,
							sendMandatoryMessage,
							client
						)).catch(err => console.log(err));

						if(getAllMsgCount() > MAX_MESSAGES_BEFORE_FREE_CHANNEL) resetAllMsgCount();
						
						await handleSendAdvertiseMessage(client, communityOfTradersAdvertiseMessages, communityOfTradersDestinationListIds);
						await handleSendAdvertiseMessage(client, topTraderTradersAdvertiseMessages, topTradersDestinationListIds);

						if (msgCountToHowToTradeValue() >= MAX_MESSAGES_BEFORE_HOW_TO_TRADE_MESSAGE) {
							await sendHowToTradeMessageToDestinationList(client, communityOfTradersDestinationListIds);
							resetHowToTradeMsgCount();
						}

						setIsSendingMessage(false);
					}
				}

				const signal = checkIfMessageHasSignal(messageData.message);

				if (signal === null || hours.length === 0) {
					if (signal?.length && channelById.waitingForSignal && getIsSendingMessage() === false) {
						setIsSendingMessage(true);

						const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
						const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
						const messageObj = { message: CALL_PUT_MESSAGE };

						await Promise.all(await applyFunctionAsync(
							allDestinationList,
							sendMessagesToDestinationList,
							client, messageObj
						)).catch(err => console.log(err));

						await Promise.all(await applyFunctionAsync(
							allDestinationList,
							sendMandatoryMessage,
							client
						)).catch(err => console.log(err));

						setChannelWaitingForSignal(channelById.id, false);
						clearSignalTimeout();
						setIsSendingMessage(false);
						
						handleMsgCount(allDestinationList);
						incrementHowToTradeMsgCount();
						incrementAllMsgCount();

						if(getAllMsgCount() > MAX_MESSAGES_BEFORE_FREE_CHANNEL) resetAllMsgCount();

						await handleSendAdvertiseMessage(client, communityOfTradersAdvertiseMessages, communityOfTradersDestinationListIds);
						await handleSendAdvertiseMessage(client, topTraderTradersAdvertiseMessages, topTradersDestinationListIds);

						if (msgCountToHowToTradeValue() >= MAX_MESSAGES_BEFORE_HOW_TO_TRADE_MESSAGE) {
							await sendHowToTradeMessageToDestinationList(client, communityOfTradersDestinationListIds);
							resetHowToTradeMsgCount();
						}
					}
				}
			}
		}

		if (isSticker(messageData.media)) {
			const channelBySignal = findChannelBySignal(true);
			const isNotWaitingForSignalOrIsSendingMessage = !channelBySignal || !channelBySignal.waitingForSignal || (getIsSendingMessage() === true);

			if (isNotWaitingForSignalOrIsSendingMessage) return;

			const isCallOrPut = checkIfStickIsCallOrPut(messageData.media as Api.MessageMediaDocument);
			if (isCallOrPut) {
				setIsSendingMessage(true);

				const CALL_PUT = createTradeSignalMessage(isCallOrPut);
				const messageObj = { message: CALL_PUT };

				await Promise.all(await applyFunctionAsync(
					allDestinationList,
					sendMessagesToDestinationList,
					client, messageObj
				)).catch(err => console.log(err));
				
				setChannelWaitingForSignal(channelById.id, false);

				await Promise.all(await applyFunctionAsync(
					allDestinationList,
					sendMandatoryMessage,
					client
				)).catch(err => console.log(err));

				clearSignalTimeout();
				setIsSendingMessage(false);
				
				handleMsgCount(allDestinationList);
				incrementHowToTradeMsgCount();
				incrementAllMsgCount();

				if(getAllMsgCount() > MAX_MESSAGES_BEFORE_FREE_CHANNEL) resetAllMsgCount();

				await handleSendAdvertiseMessage(client, communityOfTradersAdvertiseMessages, communityOfTradersDestinationListIds);
				await handleSendAdvertiseMessage(client, topTraderTradersAdvertiseMessages, topTradersDestinationListIds);

				if (msgCountToHowToTradeValue() >= MAX_MESSAGES_BEFORE_HOW_TO_TRADE_MESSAGE) {
					await sendHowToTradeMessageToDestinationList(client, communityOfTradersDestinationListIds);
					resetHowToTradeMsgCount();
				}
			}
		}

		console.log('waiting for signal: ', channelById?.waitingForSignal);
		console.log('message timeout: ', getSignalTimeout() !== null);		
	}
})();
