import styles from './App.module.css';
import { useEffect, useState, useMemo } from 'react';
import { Stops } from '../Stops/Stops';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
	TFullStop,
	TMedia,
	TPulkovo,
	TRoute,
	TSpeed,
	TStopStart,
	TStopTimes,
	TTemp,
	TWsMessage,
} from '../../types';
import {
	LeftContext,
	RightContext,
	TContextStop,
	TContextMedia,
	TContextRoute,
	RouteInitState,
	MediaInitState,
	PulkovoInitState,
} from '../../utils/store';
import { RightBlock } from '../RightBlock/RightBlock';
import { socketUrl } from '../../utils/constants';

const { VITE_ICONS_URL } = import.meta.env;

function App() {
	const [allStops, setAllStops] = useState<TFullStop[]>([]);

	const [route, setRoute] = useState<TContextRoute>(RouteInitState);
	const [appStops, setAppStops] = useState<TContextStop[]>([]);
	const [currStop, setCurrStop] = useState<TFullStop | undefined>();
	const [appSpeed, setAppSpeed] = useState<number>(0);
	const [appTemperature, setAppTemperature] = useState<number>(0);

	const [media, setMedia] = useState<TContextMedia>(MediaInitState);
	const [pulkovo, setPulkovo] = useState<TPulkovo>(PulkovoInitState);
	const [type, setType] = useState<'media' | 'pulkovo'>('media');

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const { lastJsonMessage, readyState, sendJsonMessage } =
		useWebSocket<TWsMessage>(socketUrl, {
			onError: () => {
				setError(true);
				setIsLoading(false);
			},
			onClose: () => {
				console.log('Connection closed');
				setIsLoading(false);
			},
			onOpen: () => {
				setIsLoading(false);
			},
		});

	const leftContext = useMemo(
		() => ({
			route,
			stops: appStops,
			currStop,
			speed: appSpeed,
			temperature: appTemperature,
		}),
		[route, appStops, currStop, appSpeed, appTemperature]
	);

	const rightContext = useMemo(
		() => ({
			media,
			pulkovo,
			type,
		}),
		[media, pulkovo, type]
	);

	useEffect(() => {
		if (readyState === ReadyState.CONNECTING) setIsLoading(true);
		if (!lastJsonMessage) return;
		const { icon, color, fontColor, stops } = lastJsonMessage as TRoute;
		const { index } = lastJsonMessage as TStopStart;
		const { speed } = lastJsonMessage as TSpeed;
		const { temperature } = lastJsonMessage as TTemp;
		const { src, label, length } = lastJsonMessage as TMedia;

		switch (lastJsonMessage.type) {
			case 'ROUTE':
				setAllStops(stops);
				setRoute({
					icon: VITE_ICONS_URL + icon,
					color,
					fontColor,
					name:
						stops.length !== 0
							? stops[0].nameRus + ' - ' + stops[stops.length - 1].nameRus
							: '',
				});
				break;
			case 'SPEED':
				setAppSpeed(speed);
				break;
			case 'TEMPERATURE':
				setAppTemperature(temperature);
				break;
			case 'STOP_BEGIN':
				setCurrStop(appStops?.find((el) => el.index === index));
				break;
			case 'STOP_END':
				setCurrStop(undefined);
				break;
			case 'STOP_TIMES':
				{
					const stops = [];

					for (const el of (lastJsonMessage as TStopTimes).stops) {
						const stop = allStops.find((_, i) => i === el.index);
						if (stop === undefined) return;
						else
							stops.push({
								time: el.time,
								...stop,
							});
					}

					setAppStops(stops);
				}
				break;
			case 'PLAY_IMAGE':
				setType('media');
				setMedia({
					src: VITE_ICONS_URL + src,
					label,
					length,
					type: 'img',
				});
				break;
			case 'PLAY_VIDEO':
				setType('media');
				setMedia({
					src: VITE_ICONS_URL + src,
					label,
					length,
					type: 'video',
				});
				break;
			case 'PULKOVO':
				{
					const { subtype, duration, color, contents, src } =
						lastJsonMessage as TPulkovo;
					setType('pulkovo');
					setPulkovo({
						subtype,
						duration,
						color,
						contents,
						src: VITE_ICONS_URL + src,
					});
				}
				break;
		}
	}, [lastJsonMessage]);

	return (
		<div
			className={`${styles.app} ${(isLoading || error) && styles.appOnLoading}`}
		>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : error ? (
				<p className={styles.error}>Произошла ошибка</p>
			) : (
				<>
					<LeftContext.Provider value={leftContext}>
						<Stops />
					</LeftContext.Provider>
					<RightContext.Provider value={rightContext}>
						<RightBlock sendMessage={sendJsonMessage} />
					</RightContext.Provider>
				</>
			)}
		</div>
	);
}

export default App;
