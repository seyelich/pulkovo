import route from '../assets/routesIcons/number_Route.png'
import route_1 from '../assets/routesIcons/number_Route_1.png'
import route_2 from '../assets/routesIcons/number_Route_2.png'
import route_3 from '../assets/routesIcons/number_Route_3.png'
import route_4 from '../assets/routesIcons/number_Route_4.png'
import route_5 from '../assets/routesIcons/number_Route_5.png'
import route_6 from '../assets/routesIcons/number_Route_6.png'
import route_7 from '../assets/routesIcons/number_Route_7.png'
import route_8 from '../assets/routesIcons/number_Route_8.png'
import route_9 from '../assets/routesIcons/number_Route_9.png'
import route_10 from '../assets/routesIcons/number_Route_10.png'
import route_11 from '../assets/routesIcons/number_Route_11.png'
import route_12 from '../assets/routesIcons/number_Route_12.png'
import route_13 from '../assets/routesIcons/number_Route_13.png'
import station  from '../assets/routesIcons/icon_Metro-Station.png'
import station_1  from '../assets/routesIcons/icon_Metro-Station_1.png'

export type TFlight = {
	time: string;
	number_roure: string;
	direction: string;
	company: string;
	plane_type: string;
	status: string;
}

export const flightsToArrive: TFlight[] = [
	{
		time: '12:00',
		number_roure: 'DP 517',
		direction: 'Волгоград',
		company: 'Аэрофлот',
		plane_type: 'B738',
		status: 'Регистрация 14-88',
	},
	{
		time: '12:15',
		number_roure: 'FV 6014',
		direction: 'Москва (DME)',
		company: 'Аэрофлот',
		plane_type: 'SU95',
		status: 'Регистрация 14-88',
	},
	{
		time: '12:41',
		number_roure: 'FV 6765',
		direction: 'Минеральные Воды',
		company: 'Победа',
		plane_type: 'ХХХХX',
		status: 'Регистрация 14-88',
	},
	{
		time: '13:05',
		number_roure: 'S7 1028',
		direction: 'Название длинное, в две строки',
		company: 'Аэрофлот',
		plane_type: 'B738',
		status: 'Задерживается',
	},
	{
		time: '13:30',
		number_roure: 'SU 2814',
		direction: 'Сочи',
		company: 'Россия',
		plane_type: 'A319',
		status: 'Ожидается в 13:30',
	},
	{
		time: '14:55',
		number_roure: 'YC 856',
		direction: 'Самара',
		company: 'S7',
		plane_type: 'A20N',
		status: 'Регистрация 14-88',
	},
	{
		time: '16:00',
		number_roure: 'FV 6233',
		direction: 'Гянджа',
		company: 'AZAL',
		plane_type: 'A320',
		status: 'Прибыл в 16:32',
	},
]

export const flightsToFly = [
	{
		time: '12:00',
		number_roure: 'FV 6014',
		direction: 'Москва (SVO)',
		company: 'S7',
		plane_type: 'A320',
		status: 'Отправлен в 12:01',
	},
	{
		time: '12:00',
		number_roure: 'DP 517',
		direction: 'Пенза',
		company: 'Аэрофлот',
		plane_type: 'SU 95',
		status: 'Отправлен в 12:03',
	},
	{
		time: '12:00',
		number_roure: 'DP 507',
		direction: 'Владикавказ',
		company: 'Россия',
		plane_type: 'A20N',
		status: 'Задерживается',
	},
	{
		time: '12:38',
		number_roure: 'YC 856',
		direction: 'Москва (DME)',
		company: 'AZAL',
		plane_type: 'B738',
		status: 'Регистрация 14-88',
	},
	{
		time: '14:10',
		number_roure: 'FV 6014',
		direction: 'Иркутск',
		company: 'Ямал',
		plane_type: 'A320',
		status: 'Регистрация 14-88',
	},
	{
		time: '15:40',
		number_roure: 'FV 6014',
		direction: 'Салехард',
		company: 'Аэрофлот',
		plane_type: 'A319',
		status: 'Отправлен в 15:40',
	},
	{
		time: '18:20',
		number_roure: 'J2 5121',
		direction: 'Москва (SVO)',
		company: 'S7',
		plane_type: 'A320',
		status: 'Регистрация 14-88',
	},
]

export const icons = [
	route,
	route_1,
	route_2,
	route_3,
	route_4,
	route_5,
	route_6,
	route_7,
	route_8,
	route_9,
	route_10,
	route_11,
	route_12,
	route_13,
	station,
	station_1
]
