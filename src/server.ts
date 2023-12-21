import { TelegramClient, Api } from 'telegram';
import { NewMessage, NewMessageEvent } from 'telegram/events';
import { StringSession } from 'telegram/sessions';
import 'dotenv/config';

import { destinationListIds } from './destination-list';

import { 
  listContacts,
  listDialogs,
  initialSetup,
  sendMessagesToDestinationList
} from './utils/helpers';

import { 
  checkIfMessageHasSignal,
  checkIfSignalMessageIsCallOrPut,
  checkIfStickIsCallOrPut,
  createNewSignalMesage,
  createTradeSignalMessage,
  extractDataFromMessage,
  extractDataFromMessageEvent,
  isSticker,
  isValidMessage
} from './utils/handle-message';

import {
  checkIfMessageIsFromDifferentChannel,
  findChannelById,
  findChannelBySignal,
  setChannelWaintingForSignal
} from './utils/handle-channels';

const SESSION_TOKEN = process.env.SESSION_TOKEN;
const API_HASH = process.env.API_HASH;
const APP_ID = process.env.APP_ID;

const apiId = Number(APP_ID);
const apiHash = API_HASH!;
const stringSession = new StringSession(SESSION_TOKEN);

const TEN_MINUTES = 1000 * 60 * 10;
const MAX_TIME_TO_WATING_FOR_SIGNAL = TEN_MINUTES;

let signalTimeout: NodeJS.Timeout | null = null;

function createSignalTimeout() {
  return signalTimeout = setTimeout(() => {
    console.log('reset signal');    
    const channelBySignal = findChannelBySignal(true);
    if(channelBySignal) setChannelWaintingForSignal(channelBySignal.id, false);
    clearSignalTimeout();
  }, MAX_TIME_TO_WATING_FOR_SIGNAL);
}

function clearSignalTimeout() {
  console.log('clear timeout');  
  if(signalTimeout) clearTimeout(signalTimeout);
  return signalTimeout = null;
}

(async () => {
  const client = new TelegramClient(
    stringSession,
    apiId,
    apiHash,
    { connectionRetries: 5 }
  );

  await client.connect();
  await client.getDialogs();

  client.addEventHandler(messageHandler, new NewMessage({}));

  async function messageHandler(event: NewMessageEvent) {
    const messageData = extractDataFromMessageEvent(event);

    if(messageData.isChannel) {
      const channelById = findChannelById(messageData.chatId);
      const channelBySignal = findChannelBySignal(true);
     
      if(checkIfMessageIsFromDifferentChannel(channelById, channelBySignal)) return;

      if(channelById) {

        if(isValidMessage(messageData.message)) {
          if(channelBySignal?.waitingForSignal) {
            const signal = checkIfMessageHasSignal(messageData.message);
            if(signal?.length) {
              const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
              const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
              const messageObj = { message: CALL_PUT_MESSAGE }
              await sendMessagesToDestinationList(client, messageObj, destinationListIds);              
              setChannelWaintingForSignal(channelById.id, false);
              clearSignalTimeout();
            }
          } else {
            const { currencyPair, time, hours } = extractDataFromMessage(messageData.message);
  
            if(currencyPair.length && time.length) {
              let signal: RegExpExecArray | null = null;

              if(hours.length > 0) {
                signal = checkIfMessageHasSignal(messageData.message);
              }

              const channelName = channelById.name;
              const signalMessage = createNewSignalMesage({ currencyPair, time, hours, signal, channelName });
              const messageObj = { message: signalMessage }
              await sendMessagesToDestinationList(client, messageObj, destinationListIds);

              if(signal === null || hours.length === 0) {
                setChannelWaintingForSignal(channelById.id, true);
                createSignalTimeout();
              }
            }

            const signal = checkIfMessageHasSignal(messageData.message);
            if(signal === null || hours.length === 0) { 
              if(signal?.length && channelById.waitingForSignal) {
                const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
                const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
                const messageObj = { message: CALL_PUT_MESSAGE }
                await sendMessagesToDestinationList(client, messageObj, destinationListIds);
                setChannelWaintingForSignal(channelById.id, false);
                clearSignalTimeout();
              }
            }
          }
        }

        if (isSticker(messageData.media)) {
          if(channelBySignal?.waitingForSignal) {
            const isCallOrPut = checkIfStickIsCallOrPut(messageData.media as Api.MessageMediaDocument);
            if(isCallOrPut) {
              const CALL_PUT = createTradeSignalMessage(isCallOrPut);
              const messageObj = { message: CALL_PUT }
              await sendMessagesToDestinationList(client, messageObj, destinationListIds);
              setChannelWaintingForSignal(channelById.id, false);
              clearSignalTimeout();
            }
          }
        }

        console.log(channelById?.waitingForSignal);
        console.log(signalTimeout);
      }

    }
  }
})()