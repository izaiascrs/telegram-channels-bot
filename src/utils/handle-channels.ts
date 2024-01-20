import { type TChannelInfo, channelsWatchList } from '../channels';

export function findChannelById(id: number) {
	return channelsWatchList.find(c => c.id === id);
}

export function findChannelBySignal(waiting: boolean) {
	return channelsWatchList.find(c => c.waitingForSignal === waiting);
}

export function checkIfMessageIsFromDifferentChannel(
	channelA: TChannelInfo | undefined,
	channelB: TChannelInfo | undefined
) {
	if(channelA && channelB && channelA.id !== channelB.id) return true; 
	return false;
}

export function setChannelWaitingForSignal(id: number, waiting: boolean) {
	const channel = channelsWatchList.find((c) => c.id === id);
	if(channel) channel.waitingForSignal = waiting;
}

export function isEspecialChannel(id: number) {
	const especialChannelsIds = [-1001625871874, -1001630460062 ]; // -1002137003427
	return especialChannelsIds.find(c => c === id);
}