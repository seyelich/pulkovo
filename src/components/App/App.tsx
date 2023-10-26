import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { Stops } from '../Stops/Stops';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
	TFullStop,
	TPlayMedia,
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
	LeftInitState,
	RightContext,
	RightInitState,
	TLeftContext,
	TRightContext,
} from '../../utils/store';
import { RightBlock } from '../RightBlock/RightBlock';
import { socketUrl } from '../../utils/constants';

const { VITE_ICONS_URL } = import.meta.env;

function App() {
	const [allStops, setAllStops] = useState<TFullStop[]>([]);
	const [left, setLeft] = useState<TLeftContext>(LeftInitState);
	const [right, setRight] = useState<TRightContext>(RightInitState);
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

	useEffect(() => {
		if (readyState === ReadyState.CONNECTING) setIsLoading(true);
		if (!lastJsonMessage) return;
		const { icon, color, fontColor, stops } = lastJsonMessage as TRoute;
		const { index } = lastJsonMessage as TStopStart;
		const { speed } = lastJsonMessage as TSpeed;
		const { temperature } = lastJsonMessage as TTemp;
		const { src, label, length } = lastJsonMessage as TPlayMedia;

		//@TODO fix route title & icon
		// почему-то перезаписывается left.route при первом STOP_END, который идет сразу после ROUTE
		// если закомментить setLeft при первом STOP_END, а потом раскомментить при последующих STOP_END - бага нет. 

		switch (lastJsonMessage.type) {
			case 'ROUTE':
				setAllStops(stops);
				setLeft({
					...left,
					route: {
						icon: VITE_ICONS_URL + icon,
						color,
						fontColor,
						name: stops.length !== 0 ? stops[0].nameRus + ' - ' + stops[stops.length - 1].nameRus : '',
					},
				});
				break;
			case 'SPEED':
				setLeft({ ...left, speed });
				break;
			case 'TEMPERATURE':
				setLeft({ ...left, temperature });
				break;
			case 'STOP_BEGIN':
				setLeft({
					...left,
					currStop: left.stops?.find((el) => el.index === index),
				});
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
			case 'PLAY_IMAGE' || 'PLAY_VIDEO':
				setRight({
					...right,
					type: 'media',
					media: {
						src: VITE_ICONS_URL + src,
						label,
						length,
					},
				});
				break;
			case 'PULKOVO':
			{
				const { subtype, duration, color, contents, src } = lastJsonMessage as TPulkovo;
				setRight({
					...right,
					type: 'pulkovo',
					pulkovo: {
						subtype,
						duration,
						color,
						contents, 
						src: VITE_ICONS_URL + src,
					}
				})
			}
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
						<RightBlock sendMessage={sendJsonMessage} />
					</RightContext.Provider>
				</>
			)}
		</div>
	);
}

export default App;
