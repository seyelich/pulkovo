export type TSpeed = {
	speed: number;
};

export type TTransfer = {
	icons: string[];
	nameRus?: string;
	nameEng?: string;
};

export type TPoi = {
	icon: string;
	name: string;
};

export type TRoute = {
	icon: string;
	color: string;
	fontColor: string;
	stops: TFullStop[];
};

export type TFullStop = {
	index: number;
	iconsBefore: string[];
	nameRus: string;
	nameEng: string;
	iconsAfter: string[];
	transfers: TTransfer[];
	poi: TPoi[];
};

export type TStop = {
	index: number;
	time: number;
};

export type TStopTimes = {
	stops: TStop[];
};

export type TStopStart = {
	index: number;
};

export type TPlayMedia = {
	src: string;
	label: string;
	length: number;
};

export type TTemp = {
	temperature: number;
};

export type TWsMessage = (
	| TStopTimes
	| TSpeed
	| TRoute
	| TStopStart
	| TPlayMedia
	| TTemp
) & {
	type: string;
};
