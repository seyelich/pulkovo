import { createContext } from 'react';
import { TFullStop, TPlayImage } from '../types';

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
	currStop: TFullStop | undefined;
	stops: TContextStop[];
};

export type TRightContext = {
	image: TPlayImage;
};

export const LeftInitState = {
	route: {
		icon: '',
		color: '',
		fontColor: '',
		name: '',
	},
	speed: 0,
	currStop: undefined,
	stops: [],
};

export const RightInitState = {
	image: {
		src: '',
		label: '',
		length: 0,
	},
};

export const LeftContext = createContext<TLeftContext>(LeftInitState);
export const RightContext = createContext<TRightContext>(RightInitState);
