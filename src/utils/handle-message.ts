import { Api } from 'telegram';
import { NewMessageEvent } from 'telegram/events';
import { currenciesLookup } from '../currencies';

export function checkIfStickIsCallOrPut(media: Api.MessageMediaDocument) {
	const document = media.document as Api.Document;
	const attributes = document.attributes;
	const isSticker = attributes.find((a) => a.className === 'DocumentAttributeSticker') as Api.DocumentAttributeSticker;
	
	if (isSticker) {
		if (
			isSticker.alt.includes('👎') ||
			isSticker.alt.includes('🔽') ||
			isSticker.alt.includes('👇')
		) {
			return 'PUT';
		}

		if (
			isSticker.alt.includes('👍') ||
			isSticker.alt.includes('🔼') ||
			isSticker.alt.includes('👆') ||
			isSticker.alt.includes('☝️') 
		) {
			return 'CALL';
		}
	}

	return null;
}

type TCreateNewMessageParams = {
	currencyPair: string,
	time: string,
	hours: string,
	signal: RegExpExecArray | null,
	channelName: string
}

export function createNewSignalMessage(params: TCreateNewMessageParams) {
	const { currencyPair, time, hours, signal } = params;
	const broker = 'QUOTEX';
	if (signal && signal.length) {
		const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
		const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
		const formattedMessage = `➡️ ANÁLISE FEITA \n\n 🏛️ **${broker}**\n📊 ATIVO: ${currencyPair}\n ${hours.length ? '⏱ HORÁRIO: ' + hours + '\n' : ''} ⏳ EXPIRAÇÃO: ${time}\n ${CALL_PUT_MESSAGE}`;
		return formattedMessage;
	} else {
		const formattedMessage = `➡️ ANÁLISE FEITA \n\n 🏛️ **${broker}**\n📊 ATIVO: ${currencyPair}\n ⏳ EXPIRAÇÃO: ${time}\n 🏁 Aguarde o momento de entrada`;
		return formattedMessage;
	}
}

export function createTradeSignalMessage(signal: 'CALL' | 'PUT') {
	const message = signal === 'CALL' ? '🟢 DIREÇÃO: COMPRA' : '🔴 DIREÇÃO: VENDA';
	return message;
}

export function extractDataFromMessage(msg: string) {
	const time = /\d\s?m/igm.exec(msg); // select digit followed by the m char
	const currencyPair = /\b[A-Z]{3}(?:\s|\/)[A-Z]{3}\b/g.exec(msg); // select 3 uppercase char followed by space or backslash followed 3 uppercase char  
	const hours = /\d{2}:\d{2}/gm.exec(msg);
	const otc = /otc/gi.exec(msg);

	const timeCurrencyPair = {
		currencyPair: '',
		time: '',
		hours: '',
	};

	if (time?.length) {
		const formattedTime = time[0].replace(/\s/, '').split('').join(' ').toUpperCase();
		timeCurrencyPair.time = formattedTime;
	} else {
		const time = /m\s?\d/gi.exec(msg); // M5 M 5
		if (time?.length) {
			const formattedTime = time[0].split('').reverse().join(' ');
			timeCurrencyPair.time = formattedTime;
		}
	}

	if (currencyPair?.length) {
		const pair = currencyPair[0].replace(/\s?\/?/g, '');
		const isValidCurrencyPair = currenciesLookup.has(pair);

		if (isValidCurrencyPair) {
			const formattedPair = currencyPair[0].replace(/\s/, '/');
			timeCurrencyPair.currencyPair = formattedPair;
		}
	} else {
		const currencyPair = /\b[A-Z]{6}\b/g.exec(msg);
		if (currencyPair?.length) {
			const isValidCurrencyPair = currenciesLookup.has(currencyPair[0]);
			if (isValidCurrencyPair) {
				timeCurrencyPair.currencyPair = currencyPair[0].replace(/(\w{3})/, '$1/');
			}
		}
	}

	if (hours?.length) {
		if (timeCurrencyPair.time !== '1 M') {
			timeCurrencyPair.hours = hours[0];
		}
	}

	if (otc?.length) {
		if (timeCurrencyPair.currencyPair.length) {
			const otcPair = timeCurrencyPair.currencyPair + ` (${otc[0]})`;
			timeCurrencyPair.currencyPair = otcPair.toUpperCase();
		}
	}

	if (timeCurrencyPair.currencyPair.length === 0 || timeCurrencyPair.time.length === 0) {
		return {
			currencyPair: '',
			time: '',
			hours: '',
		};
	}

	return timeCurrencyPair;
}

export function extractDataFromEspecialChannelMessage(msg: string) {
	const time = /m\s?\d/gi.exec(msg); // M5 M 5
	const currencyPair = /\b[A-Z]{6}\b.*/g.exec(msg); // select 3 uppercase char followed by space or backslash followed 3 uppercase char  
	const hours = /(?<!-)\d{2}:\d{2}/gm.exec(msg);
	const result = /resultado/gim.exec(msg);

	const isOTC = (cPair: string) => /otc/gi.test(cPair);

	const timeCurrencyPair = {
		currencyPair: '',
		time: '',
		hours: '',
	};

	if (result?.length) return timeCurrencyPair;

	if (time?.length) {
		const formattedTime = time[0].split('').reverse().join(' ');
		timeCurrencyPair.time = formattedTime;
	}

	if (currencyPair?.length) {
		if (!isOTC(currencyPair[0])) {
			const isValidCurrencyPair = currenciesLookup.has(currencyPair[0]);
			if (isValidCurrencyPair) {
				timeCurrencyPair.currencyPair = currencyPair[0].replace(/(\w{3})/, '$1/');
			}
		}
	}

	if (hours?.length) {
		timeCurrencyPair.hours = hours[0];
	}

	return timeCurrencyPair;
}

export function checkIfMessageHasSignal(msg: string) {
	let signal = /👎|👍|👇|👆|CALL|PUT|UP|DOWN|COMPRA|VENDA/g.exec(msg); // signals only uppercase
	if (!signal) {
		signal = /👎|👍|👇|👆|CALL|PUT|UP|DOWN|COMPRA|VENDA/gi.exec(msg); // signals uppercase and lowercase
	}
	return signal;
}

export function checkIfSignalMessageIsCallOrPut(msg: string) {
	const callRegex = /👆|👍|CALL|UP|COMPRA/gi.exec(msg);
	if (callRegex?.length) return 'CALL';
	return 'PUT';
}

export function isSticker(media: Api.TypeMessageMedia | undefined) {
	return media && media.className === 'MessageMediaDocument';
}

export function isValidMessage(msg: string) {
	const isBalanceMessage = /relatório|relatorio|report|resultado|result/gim.test(msg);
	const isMessageBetweenRange = (msg.length > 0 && msg.length < 350);
	return isMessageBetweenRange && !isBalanceMessage;
}

export function extractDataFromMessageEvent(event: NewMessageEvent) {
	const senderEntity = event._entities.get(String(event.chatId));
	const channelName = (senderEntity && senderEntity.className === 'Channel') ? senderEntity.title : 'N/A';
	const messageData = {
		chatId: parseInt(String(event.chatId)),
		isChannel: event.isChannel,
		isGroup: event.isGroup,
		isPrivate: event.isPrivate,
		message: event.message.message,
		media: event?.message?.media,
		channelName: channelName,
	};
	return messageData;
}