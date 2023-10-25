import { TFlight } from "../types";

export const pulkovoSubtypes = {
	ARRIVAL: 'ARRIVAL',
	DEPARTURE: 'DEPARTURE',
	COUNTERS: 'COUNTERS',
} as {
	ARRIVAL: 'ARRIVAL',
	DEPARTURE: 'DEPARTURE',
	COUNTERS: 'COUNTERS',
}

export const flightsToArrive: TFlight[] = [
	{
		time: '12:00',
		flightNumber: 'DP 517',
		direction: 'Волгоград',
		company: 'Аэрофлот',
		planeType: 'B738',
		status: 'Регистрация 14-88',
	},
	{
		time: '12:15',
		flightNumber: 'FV 6014',
		direction: 'Москва (DME)',
		company: 'Аэрофлот',
		planeType: 'SU95',
		status: 'Регистрация 14-88',
	},
	{
		time: '12:41',
		flightNumber: 'FV 6765',
		direction: 'Минеральные Воды',
		company: 'Победа',
		planeType: 'ХХХХX',
		status: 'Регистрация 14-88',
	},
	{
		time: '13:05',
		flightNumber: 'S7 1028',
		direction: 'Название длинное, в две строки',
		company: 'Аэрофлот',
		planeType: 'B738',
		status: 'Задерживается',
	},
	{
		time: '13:30',
		flightNumber: 'SU 2814',
		direction: 'Сочи',
		company: 'Россия',
		planeType: 'A319',
		status: 'Ожидается в 13:30',
	},
	{
		time: '14:55',
		flightNumber: 'YC 856',
		direction: 'Самара',
		company: 'S7',
		planeType: 'A20N',
		status: 'Регистрация 14-88',
	},
	{
		time: '16:00',
		flightNumber: 'FV 6233',
		direction: 'Гянджа',
		company: 'AZAL',
		planeType: 'A320',
		status: 'Прибыл в 16:32',
	},
];

export const flightsToFly = [
	{
		time: '12:00',
		flightNumber: 'FV 6014',
		direction: 'Москва (SVO)',
		company: 'S7',
		planeType: 'A320',
		status: 'Отправлен в 12:01',
	},
	{
		time: '12:00',
		flightNumber: 'DP 517',
		direction: 'Пенза',
		company: 'Аэрофлот',
		planeType: 'SU 95',
		status: 'Отправлен в 12:03',
	},
	{
		time: '12:00',
		flightNumber: 'DP 507',
		direction: 'Владикавказ',
		company: 'Россия',
		planeType: 'A20N',
		status: 'Задерживается',
	},
	{
		time: '12:38',
		flightNumber: 'YC 856',
		direction: 'Москва (DME)',
		company: 'AZAL',
		planeType: 'B738',
		status: 'Регистрация 14-88',
	},
	{
		time: '14:10',
		flightNumber: 'FV 6014',
		direction: 'Иркутск',
		company: 'Ямал',
		planeType: 'A320',
		status: 'Регистрация 14-88',
	},
	{
		time: '15:40',
		flightNumber: 'FV 6014',
		direction: 'Салехард',
		company: 'Аэрофлот',
		planeType: 'A319',
		status: 'Отправлен в 15:40',
	},
	{
		time: '18:20',
		flightNumber: 'J2 5121',
		direction: 'Москва (SVO)',
		company: 'S7',
		planeType: 'A320',
		status: 'Регистрация 14-88',
	},
];
