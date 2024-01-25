import { TelegramClient } from 'telegram';
import { describe, expect, it, vi } from 'vitest';
import { TAdvertiseMessage } from '../advertise-messages';
import { TDestinationListData } from '../destination-list';
import { applyFunctionAsync, filterFreeChannels, handleMsgCount, isBreakTime, isFreeChannelWorkingTime, makeCounter, sendAdvertiseMessageToDestinationList, sendMessagesToDestinationList } from './helpers';

const mockDestChannels: TDestinationListData[] = [
	{
		classification: 'Vip',
		msgCounter: makeCounter(),
		id: 1,
		advertiseMsgIndexController: makeCounter(),
		hasWorkingTime: false,
		mixedChannel: false,
		advertiseMsgCount: 5
	},
	{
		classification: 'Free',
		msgCounter: makeCounter(),
		id: 3,
		advertiseMsgIndexController: makeCounter(),
		hasWorkingTime: false,
		mixedChannel: false,
		advertiseMsgCount: 5
	},
	{
		classification: 'Free',
		msgCounter: makeCounter(),
		id: 2,
		advertiseMsgIndexController: makeCounter(),
		hasWorkingTime: false,
		mixedChannel: false,
		advertiseMsgCount: 5
	},
];

const makeFakeTelegramClient = () => ({
	sendMessage: vi.fn(),
}) as unknown as TelegramClient;

const makeMockDestMessages = (): TAdvertiseMessage => ({
	messages: [
		{ message: 'advertise message 1' },
		{ message: 'advertise message 2' },
	],
	messagesIndexController: makeCounter(),
});

const mockMessage = {
	message: 'test message',
};

function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

describe('helpers functions', () => {

	describe('break time function', () => {
		it('return false when current time less them 19 and grater then 22', () => {
			const breakTime = isBreakTime();
			expect(breakTime).toBeFalsy();
		});
	
		it('return true when hours is between 19 and 21', () => {
			const currentDateTime = new Date();
			const breakTime1 = isBreakTime(new Date(currentDateTime.setHours(19, 0)));
			const breakTime2 = isBreakTime(new Date(currentDateTime.setHours(21, 59)));
			
			expect(breakTime1).toBeTruthy();
			expect(breakTime2).toBeTruthy();
		});
	
		it('return false when hours is equal to 22', () => {
			const currentDateTime = new Date();
			const breakTime1 = isBreakTime(new Date(currentDateTime.setHours(22, 0)));
			const breakTime2 = isBreakTime(new Date(currentDateTime.setHours(22, 59)));
			expect(breakTime1).toBeFalsy();
			expect(breakTime2).toBeFalsy();
		});
	
		it('return true when hours is equal to 19', () => {
			const currentDateTime = new Date();
			const breakTime1 = isBreakTime(new Date(currentDateTime.setHours(19, 0)));
			const breakTime2 = isBreakTime(new Date(currentDateTime.setHours(19, 59)));
			expect(breakTime1).toBeTruthy();
			expect(breakTime2).toBeTruthy();
		});
	});

	describe('free channel working time', () => {
		it('return false when current time is between 15:30 and 23:59', () => {
			Array.from({ length: 10 }).forEach(() => {
				const randomHours = randomIntFromInterval(15, 23);
				const randomMinutes = randomIntFromInterval(30, 59);
				const breakTime = isFreeChannelWorkingTime(new Date(new Date().setHours(randomHours, randomMinutes)));
				expect(breakTime).toBeFalsy(); 
			}); 
		});

		it('return true when current time is between 00:00 and 15:29', () => {
			Array.from({ length: 10 }).forEach(() => {
				const randomHours = randomIntFromInterval(0, 15);
				const randomMinutes = randomIntFromInterval(0, 29);
				const breakTime = isFreeChannelWorkingTime(new Date(new Date().setHours(randomHours, randomMinutes)));
				expect(breakTime).toBeTruthy(); 
			}); 
		});
	});

	describe('send telegram message function', () => {
		it('send a message to a destination user id', async () => {
			const mockTelegramClient = makeFakeTelegramClient();
			await sendMessagesToDestinationList(mockTelegramClient, mockMessage, mockDestChannels);
			expect(mockTelegramClient.sendMessage).toBeCalledTimes(mockDestChannels.length);
			mockDestChannels.forEach((dest) => expect(mockTelegramClient.sendMessage).toBeCalledWith(dest.id, mockMessage));			
		});
	});

	describe('send advertise message function', () => {
		it('send a message to a destination user id', async () => {
			const mockTelegramClient = makeFakeTelegramClient();
			const mockDestMessages = makeMockDestMessages();

			mockDestChannels.forEach((channel) => {
				sendAdvertiseMessageToDestinationList(mockTelegramClient, channel, mockDestMessages);
				expect(mockTelegramClient.sendMessage).toBeCalled();
				expect(mockTelegramClient.sendMessage)
					.toBeCalledWith(
						channel.id,
						mockDestMessages.messages[channel.msgCounter.value()],
					);
			});
			
			
		});

		it('increment message index every time a message is sent', async () => {
			const mockTelegramClient = makeFakeTelegramClient();
			const mockDestMessages = makeMockDestMessages();
			const mockDestChannels: TDestinationListData[] = [
				{
					classification: 'Vip',
					msgCounter: makeCounter(),
					id: 1,
					advertiseMsgIndexController: makeCounter(),
					hasWorkingTime: false,
					mixedChannel: false,
					advertiseMsgCount: 5
				},
			];
			const currentDestItem = mockDestChannels[0];
			sendAdvertiseMessageToDestinationList(mockTelegramClient, currentDestItem, mockDestMessages);			
			expect(currentDestItem.advertiseMsgIndexController.value()).toBe(1);
			sendAdvertiseMessageToDestinationList(mockTelegramClient, currentDestItem, mockDestMessages);
			expect(currentDestItem.advertiseMsgIndexController.value()).toBe(2);
			sendAdvertiseMessageToDestinationList(mockTelegramClient, currentDestItem, mockDestMessages);			
			expect(currentDestItem.advertiseMsgIndexController.value()).toBe(1);
		});
	});

	describe('filter free channels function', () => {
		it('return only vip channels', () => {			
			const vipChannels = filterFreeChannels(mockDestChannels, true);
			expect(vipChannels).toHaveLength(1);
			mockDestChannels.push({
				id: 4,
				classification: 'Vip',
				msgCounter: makeCounter(),
				advertiseMsgIndexController: makeCounter(),
				hasWorkingTime: false,
				mixedChannel: false, 
				advertiseMsgCount: 5
			});
			const vipChannels2 = filterFreeChannels(mockDestChannels, true);
			expect(vipChannels2).toHaveLength(2);
		});
	});

	describe('handle message count function', () => {
		it('increment message count by 1', () => {
			handleMsgCount([mockDestChannels]);			
			const counters = mockDestChannels.map((dest) => dest.msgCounter.value());
			counters.forEach((c) => expect(c).toEqual(1));
		});
	});

	describe('apply function async',  () => {
		const fn = vi.fn();
		const items = [1, 2, 3, 4];
		it('call a specific function for each array item with the item as first param', () => {
			applyFunctionAsync(items, fn, 'params');
			expect(fn).toHaveBeenCalledTimes(items.length);
		});

		it('call a specific function with additional params for each array item and add item as last param of the function', () => {
			applyFunctionAsync(items, fn, 'params');
			items.forEach((item) => expect(fn).toHaveBeenCalledWith('params', item));
			applyFunctionAsync(items, fn, 'params', 123);
			items.forEach((item) => expect(fn).toHaveBeenCalledWith('params', 123, item));
		});
	});
});