import { makeCounter } from '../utils/helpers';

type TDestinationList = {
  type: 'Channel' | 'User' | 'Group';
  id: number;
  name: string;
  classification: 'Vip' | 'Free';
	mixedChannel: boolean;
	hasWorkingTime: boolean;	
}

const communityOfTradersDestinationList: TDestinationList[] = [
	// ************ REAL CHANNELS ************ //
	{
		type: 'Channel',
		id: 1870260708,
		name: '📉 QUOTEX - COMUNIDADE DOS TRADERS VIP 👥',
		classification: 'Vip',
		hasWorkingTime: false,
		mixedChannel: false,
	},
	{
		type: 'Channel',
		id: 1933838176,
		name: 'COMUNIDADE DOS TRADERS FREE',
		classification: 'Free',
		hasWorkingTime: true,
		mixedChannel: true,
	},
	// ************ REAL CHANNELS ************ //

	// ************ TEST CHANNELS ************ //
	// {
	// 	type: 'User',
	// 	id: 6018633227,
	// 	name: 'izaias',
	// 	classification: 'Vip',
	// 	mixedChannel: false,
	// 	hasWorkingTime: false,
	// },
	// ************ TEST CHANNELS ************ //
];

const topTradersDestinationList: TDestinationList[] = [
	// ************ REAL CHANNELS ************ //
	// {
	// 	type: 'Channel',
	// 	id: 2010654986,
	// 	name: '🧑‍💻TOP TRADERS QUOTEX FREE 👨‍💻',
	// 	classification: 'Free',
	// 	hasWorkingTime: false,
	// 	mixedChannel: false,
	// },
	// {
	// 	type: 'Channel',
	// 	id: 1944489390,
	// 	name: 'TOP TRADERS QUOTEX VIP',
	// 	classification: 'Vip',
	// 	hasWorkingTime: false,
	// 	mixedChannel: false,
	// },
	// ************ REAL CHANNELS ************ //

	// ************ TEST CHANNELS ************ //
	// {
	// 	type: 'Group',
	// 	id: 4037329961,
	// 	name: 'Grupo destino',
	// 	classification: 'Free',
	// 	mixedChannel: true,
	// 	hasWorkingTime: true,
	// },	
	// {
	// 	type: 'Group',
	// 	id: 4072662222,
	// 	name: 'Grupo origem',
	// 	classification: 'Vip',
	// 	mixedChannel: false,
	// 	hasWorkingTime: false,
	// },
	// ************ TEST CHANNELS ************ //
];

export type TDestinationListData = ReturnType<typeof makeDestinationItem>;

function makeDestinationItem(item: TDestinationList) {
	const { id, classification, hasWorkingTime, mixedChannel } = item;
	return { 
		id,
		classification,
		msgCounter: makeCounter(),
		advertiseMsgIndexController: makeCounter(),
		advertiseMsgCount: classification === 'Vip' ? 10 : 5,
		mixedChannel,
		hasWorkingTime,
	};
}

export const communityOfTradersDestinationListIds: TDestinationListData[] = communityOfTradersDestinationList.map(makeDestinationItem);

export const topTradersDestinationListIds: TDestinationListData[] = topTradersDestinationList.map(makeDestinationItem);