import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Stops } from '../Stops/Stops';
import useWebSocket from 'react-use-websocket';
import { TFullStop, TRoute, TSpeed, TStopStart, TStopTimes, TWsMessage } from '../../types';
import { RouteContext, TRouteContext } from '../../utils/store';
import { RightBlock } from '../RightBlock/RightBlock';

const {
	VITE_ICONS_URL,
	VITE_WS_ID,
} = import.meta.env;


function App() {
	const socketUrl = `ws://${VITE_WS_ID}`;
	const [allStops, setAllStops] = useState<TFullStop[]>([]);
	const [data, setData] = useState<TRouteContext>({
		route: {
			icon: '',
			color: '',
			fontColor: '',
			name: '',
		},
		speed: 0,
		currStop: undefined,
		stops: [],
	});

  const { lastJsonMessage } = useWebSocket<TWsMessage>(socketUrl, {
		onError: (err) => { console.log(err) },
		onClose: () => { console.log("Connection closed")},
		onOpen: () => { console.log("Connection opened")},
	});

  useEffect(() => {
		if(!lastJsonMessage) return;
		const { icon, color, fontColor, stops } = lastJsonMessage as TRoute;
		const { index } = lastJsonMessage as TStopStart;
		const { speed } = lastJsonMessage as TSpeed;
		const currStop = stops?.find(el => el.index === index);

		switch (lastJsonMessage.type) {
			case "ROUTE":
				setAllStops(stops);
				setData({ 
					...data, 
					route: {
						icon: VITE_ICONS_URL + '/' + icon,
						color,
						fontColor,
						name: stops[0].nameRus + ' - ' + stops[stops.length-1].nameRus
					}
				})
				break;
			case "SPEED":
				setData({ ...data, speed: speed })
				break;
			case "STOP_BEGIN":
				setData({ ...data, currStop })
				break;
			case "STOP_TIMES": {
				const stops = [];

				for(const el of (lastJsonMessage as TStopTimes).stops) {
					const stop = allStops.find((_, i) => i === el.index);
					if(stop === undefined) return;
					else stops.push({
						time: el.time,
						...stop,
					})
				}
				
				setData({
					...data,
					stops: stops
				})
			}
				break;
		}
  }, [lastJsonMessage]);

  return (
		<>
			<div>
				<div className={styles.app}>
					<RouteContext.Provider value={data}>
						<Stops />
					</RouteContext.Provider>
					<RightBlock />
				</div>
			</div>
		</>
  )
}

export default App
