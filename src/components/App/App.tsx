import styles from './App.module.css'
import city from '../../assets/Pic.png';
import { flightsToArrive } from '../../utils/data';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { useEffect, useState } from 'react';
import { Stops } from '../Stops/Stops';
import { Reception } from '../Reception/Reception';
import useWebSocket from 'react-use-websocket';
import { TFullStop, TRoute, TStop, TWsMessage } from '../../types';

export type TData = {
	speed: number,
	stops: (TFullStop & { time: number })[],
}

function App() {
	const [stage, setStage] = useState(0);
	const [socketUrl] = useState(`ws://192.168.100.194:23245`);
	const [route, setRoute] = useState<TRoute>({
		icon: '',
		color: '',
		fontColor: '',
		stops: []
	});
	const [data, setData] = useState<TData>({
		speed: 0,
		stops: [],
	});
  const { lastJsonMessage, getWebSocket} = useWebSocket<TWsMessage>(socketUrl, {
		onError: (err) => { console.log(err) },
		onClose: () => { console.log("Connection closed")},
		onOpen: () => { console.log("Connection opened")},
	});

  useEffect(() => {
		if(!lastJsonMessage) return;
		switch (lastJsonMessage.type) {
			case "ROUTE":
				setRoute(lastJsonMessage)
			case "SPEED":
				setData({ ...data, speed: lastJsonMessage.speed })
				break;
			case "STOP_END":

				break;
			case "STOP_TIMES": {
				const stops = [];

				for(const el of lastJsonMessage.stops) {
					const stop = route!.stops.find((_, i) => i === el.index);
					if(stop === undefined) return;
					else stops.push({
						time: el.time,
						...stop,
					})
				}

				lastJsonMessage.stops.map((el, index) => {
					const stop = route!.stops.find((_, i) => i === index);
					if(stop === undefined) return;
					else return {
						time: el.time,
						...stop,
					}
				})

				console.log(stops)
				
				setData({
					...data,
					stops: stops
				})
			}
				
				break;
		}
		// return () => { getWebSocket()?.close() };
  }, [lastJsonMessage]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		stage < 3 && setStage(stage => stage+1);
	// 		stage === 3 && setStage(0);
	// 	}, 10000);
	// 	return () => clearInterval(interval)
	// }, [stage]);

	const setRightBlock = () => {
		switch (stage) {
			case 0:
				return <img src={city} alt='Москва' />
			case 1:
				return <FlightTable flights={flightsToArrive} type='arrival'/>
			case 2:
				return <FlightTable flights={flightsToArrive} type='departure'/>
			case 3:
				return <Reception />
			default:
				break;
		}
	}

  return (
		<>
			<div>
				<div className={styles.app}>
					<Stops data={data} />
					{
						setRightBlock()
					}
				</div>
			</div>
		</>
  )
}

export default App
