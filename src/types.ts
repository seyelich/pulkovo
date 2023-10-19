export type TSpeed = {
	speed: number
}

export type TTransfer = {
	icons: string[];
	nameRus: string;
	nameEng: string
}

export type TPoi = {
	icon: string;
	name: string;
}

export type TRoute = {
  icon: string;
  color: string;
  fontColor: string;
  stops: TFullStop[];
}

export type TFullStop = {
	index: number;
	iconsBefore: string[]
	nameRus: string;
	nameEng: string;
	iconsAfter: string[]
	transfers: TTransfer[];
	POI: TPoi[];
}

export type TStop = {
	index: number;
	time: number;
}

type TStopTimes = {
	stops: TStop[]
}

export type TWsMessage = TStopTimes & TSpeed & TRoute & {
	type: string;
}
