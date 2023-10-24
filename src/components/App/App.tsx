import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { Stops } from '../Stops/Stops';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
	TFullStop,
	TPlayImage,
	TRoute,
	TSpeed,
	TStopStart,
	TStopTimes,
	TWsMessage,
} from '../../types';
import {
	LeftContext,
	LeftInitState,
	RightContext,
	RightInitState,
	TLeftContext,
	TRightContext,
} from '../../utils/store';
import { RightBlock } from '../RightBlock/RightBlock';
import { socketUrl } from '../../utils/constants';

const { VITE_ICONS_URL } = import.meta.env;

console.log(VITE_ICONS_URL);

function App() {
	const [allStops, setAllStops] = useState<TFullStop[]>([]);
	const [left, setLeft] = useState<TLeftContext>(LeftInitState);
	const [right, setRight] = useState<TRightContext>(RightInitState);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const { lastJsonMessage, readyState } = useWebSocket<TWsMessage>(socketUrl, {
		onError: () => {
			setError(true);
			setIsLoading(false);
		},
		onClose: () => {
			console.log('Connection closed');
		},
		onOpen: () => {
			setIsLoading(false);
		},
	});

	useEffect(() => {
		if (readyState === ReadyState.CONNECTING) setIsLoading(true);
		if (!lastJsonMessage) return;
		const { icon, color, fontColor, stops } = lastJsonMessage as TRoute;
		const { index } = lastJsonMessage as TStopStart;
		const { speed } = lastJsonMessage as TSpeed;
		const { src, label, length } = lastJsonMessage as TPlayImage;

		//@TODO fix route title & icon

		switch (lastJsonMessage.type) {
			case 'ROUTE':
				setAllStops(stops);
				setLeft({
					...left,
					route: {
						icon: VITE_ICONS_URL + icon,
						color,
						fontColor,
						name: stops[0].nameRus + ' - ' + stops[stops.length - 1].nameRus,
					},
				});
				break;
			case 'SPEED':
				setLeft({ ...left, speed: speed });
				break;
			case 'STOP_BEGIN':
				setLeft({ ...left, currStop: left.stops?.find(el => el.index === index)});
				break;
			case 'STOP_END':
				setLeft({ ...left, currStop: undefined });
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

					setLeft({
						...left,
						stops: stops,
					});
				}
				break;
			case 'PLAY_IMAGE':
				setRight({
					...right,
					image: {
						src: VITE_ICONS_URL + src,
						label,
						length,
					},
				});
				break;
		}
	}, [lastJsonMessage, readyState]);

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
					<LeftContext.Provider value={left}>
						<Stops />
					</LeftContext.Provider>
					<RightContext.Provider value={right}>
						<RightBlock />
					</RightContext.Provider>
				</>
			)}
		</div>
	);
}

export default App;
