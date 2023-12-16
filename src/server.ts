import { TelegramClient, client, Api } from 'telegram';
import { NewMessage } from 'telegram/events';
import { StringSession } from 'telegram/sessions';
import 'dotenv/config';
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
  extractDataFromMessage
} from './utils/handle-message';

const SESSION_TOKEN = process.env.SESSION_TOKEN;

const apiId = 24216003;
const apiHash = '5f7551f6d5cb8e084289927ffdcce113';
const stringSession = new StringSession(SESSION_TOKEN);
const channelsInfo = [
  {
    id: -1002137003427,
    name: 'Canal teste',
    waitingForSignal: false,
    type: 'Channel'
  },
  {
    id: -1002039318892,
    name: 'canal teste 2',
    waitingForSignal: false,
    type: 'Channel',
  },
  {
    id: -1002138548602,
    name: 'Teste bot',
    waitingForSignal: false,
    type: 'Channel'
  },
  {
    type: 'Channel',
    id: -1002011222704,
    name: 'Teste Bot 2',
    waitingForSignal: false,
  },

  //************ official channels watch list ************//
  {
    type: 'Channel',
    id: -1001695472706,
    name: 'MOQ|Master Of Quotex',
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id:  -1001194604848,
    name: '🏳 CONSYSTE TRADERS 🏴'      ,
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id:  -1001786822830,
    name: 'Canal Oficial | MOHAMED ®'  ,
    waitingForSignal: false,
  },  
  {
    type: 'Channel',
    id:  -1001618524236,
    name: 'BULLISH QUEEN 🎯',
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id:  -1001296434684,
    name: 'Olymp Trade Quotex Signals',
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id:  -1001942617161,
    name: 'MASHALLAH TRADER🌹',
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id:  -1001724386836,
    name: 'Technical Hitesh',
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id: -1001785019775,
    name: 'QUOTEX BUG SIGNALS 🤯🚀',
    waitingForSignal: false,
  },
  {
    type: 'Channel',
    id: -1001504485479,
    name: 'CONSYSTE 1 GALE (FREE)',
    waitingForSignal: false,
  },
];

const origemGrup = 4072662222;
const destineGrup = 4037329961;
const vladmirId = 983513353;
const myId = 6018633227;
// const channelsWatchList = [channelsInfo.map(c => c.id)];
// const destinationList = [destineGrup, origemGrup, vladmirId, myId];

const destinationList = [myId];

(async () => {
  const client = new TelegramClient(
    stringSession,
    apiId,
    apiHash,
    { connectionRetries: 5 }
  );

  await client.connect();
  await client.getDialogs();
  // const contacts = await listDialogs(client);
  // console.log(contacts);


  client.addEventHandler(async (event) => {
    const message = {
      chatId: parseInt(String(event.chatId)),
      isChannel: event.isChannel,
      isGroup: event.isGroup,
      isPrivate: event.isPrivate,
      message: event.message.message,
      media: event?.message?.media,
    }

    if(message.isChannel) {
      const channelInfo = channelsInfo.find(c => c.id === message.chatId);
      const hasChannelWaitingForSignal = channelsInfo.find(c => c.waitingForSignal === true);

      if(
        hasChannelWaitingForSignal && channelInfo &&
        hasChannelWaitingForSignal.id !== channelInfo?.id
      ) return; 

      if(channelInfo) {
        if(message.message) {
          if(hasChannelWaitingForSignal?.waitingForSignal) {
            const signal = checkIfMessageHasSignal(message.message)
            if(signal?.length) {
              const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
              const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
              const messageObj = { message: CALL_PUT_MESSAGE }
              await sendMessagesToDestinationList(client, messageObj, destinationList);
              // await client.sendMessage(4037329961, { message: CALL_PUT_MESSAGE })
              channelInfo.waitingForSignal = false;
            }  
          } else {
            const { currencyPair, time, hours } = extractDataFromMessage(message.message);
  
            if(currencyPair.length && time.length) {
              let signal: RegExpExecArray | null = null;

              if(hours.length > 0) {
                signal = checkIfMessageHasSignal(message.message);
              }

              const channelName = channelInfo.name;

              const signalMessage = createNewSignalMesage({ currencyPair, time, hours, signal, channelName });
              const messageObj = { message: signalMessage }
              await sendMessagesToDestinationList(client, messageObj, destinationList);

              if(signal === null || hours.length === 0) {
                channelInfo.waitingForSignal = true;
              }
            }

            const signal = checkIfMessageHasSignal(message.message);
            if(signal === null || hours.length === 0) { 
              if(signal?.length && channelInfo.waitingForSignal) {
                const CALL_PUT_SIGNAL = checkIfSignalMessageIsCallOrPut(signal[0]);
                const CALL_PUT_MESSAGE = createTradeSignalMessage(CALL_PUT_SIGNAL);
                const messageObj = { message: CALL_PUT_MESSAGE }
                await sendMessagesToDestinationList(client, messageObj, destinationList);
                channelInfo.waitingForSignal = false;
              }
            }
          }          
        }

        if (message.media && message.media.className === 'MessageMediaDocument') {          
          if(hasChannelWaitingForSignal?.waitingForSignal) {
            const isCallOrPut = checkIfStickIsCallOrPut(message.media);
            if(isCallOrPut) {
              const CALL_PUT = createTradeSignalMessage(isCallOrPut);
              const messageObj = { message: CALL_PUT }
              await sendMessagesToDestinationList(client, messageObj, destinationList);
              channelInfo.waitingForSignal = false;
            }
          }
        }
      }

      console.log(channelInfo?.waitingForSignal);
    }

  }, new NewMessage({}));

})()