import { createContext } from 'react';
import { TFullStop, TPlayMedia, TPulkovo } from '../types';
import { pulkovoSubtypes } from './data';

export type TContextStop = TFullStop & { time: number };

export type TRoute = {
	icon: string;
	color: string;
	fontColor: string;
	name: string;
};

export type TLeftContext = {
	route: {
		icon: string;
		color: string;
		fontColor: string;
		name: string;
	};
	speed: number;
	temperature: number;
	currStop: TFullStop | undefined;
	stops: TContextStop[];
};

export type TRightContext = {
	media: TPlayMedia;
	pulkovo: TPulkovo;
};

export const LeftInitState = {
	route: {
		icon: '',
		color: '',
		fontColor: '',
		name: '',
	},
	speed: 0,
	temperature: 0,
	currStop: undefined,
	stops: [],
};

export const RightInitState = {
	media: {
		src: '',
		label: '',
		length: 0,
	},
	pulkovo: {
		subtype: pulkovoSubtypes.ARRIVAL,
		duration: 0,
		color: '',
		contents: [],
		src: '',
	}
};

export const LeftContext = createContext<TLeftContext>(LeftInitState);
export const RightContext = createContext<TRightContext>(RightInitState);
