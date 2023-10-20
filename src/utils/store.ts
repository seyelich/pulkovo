import { createContext } from 'react'
import { TFullStop } from '../types'

export type TContextStop = (TFullStop & { time: number });

export type TRouteContext = {
	route: {
		icon: string,
		color: string,
		fontColor: string,
		name: string,
	}
	speed: number,
	currStop: TFullStop | undefined,
	stops: TContextStop[],
}

export const RouteContext = createContext<TRouteContext>({
	route: {
		icon: '',
		color: '',
		fontColor: '',
		name: '',
	},
	speed: 0,
	currStop: undefined,
	stops: []
})
