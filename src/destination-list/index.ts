import { TMakeCounter, makeCounter } from '../utils/helpers';

type TDestinationList = {
  type: 'Channel' | 'User' | 'Group';
  id: number;
  name: string;
  classification: 'Vip' | 'Free'
}

const communityOfTradersDestinationList: TDestinationList[] = [
	// ***** channel to send ************ //
	// {
	//   type: 'Channel',
	//   id: 1870260708,
	//   name: '📉 QUOTEX - COMUNIDADE DOS TRADERS VIP 👥'  
	// },
	// ***** channel to send ************ //
];

const topTradersDestinationList: TDestinationList[] = [
	// {
	// 	type: 'Channel',
	// 	id: 2010654986,
	// 	name: '🧑‍💻TOP TRADERS QUOTEX FREE 👨‍💻',
	// 	classification: 'Free',
	// },
	// {
	// 	type: 'Channel',
	// 	id: 1944489390,
	// 	name: 'TOP TRADERS QUOTEX VIP',
	// 	classification: 'Vip',
	// },	
];

export type TDestinationListData = {
	id: number,
	classification: 'Vip' | 'Free',
	msgCounter: TMakeCounter,

}

export const communityOfTradersDestinationListIds: TDestinationListData[] = 
	communityOfTradersDestinationList.map(({id, classification}) => ({ id, classification, msgCounter: makeCounter() }));

export const topTradersDestinationListIds: TDestinationListData[] =
	topTradersDestinationList.map(({id, classification}) => ({ id, classification, msgCounter: makeCounter() }));