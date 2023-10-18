import styles from './App.module.css'
import city from '../../assets/Pic.png';
import { flightsToArrive } from '../../utils/data';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { useEffect, useState } from 'react';
import { Stops } from '../Stops/Stops';
import { Reception } from '../Reception/Reception';

function App() {
	const [stage, setStage] = useState(0);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		stage < 1 && setStage(stage => stage+1);
	// 		stage === 1 && setStage(0);
	// 	}, 10000);
	// 	return () => clearInterval(interval)
	// }, [stage]);

	// const setRightBlock = () => {
	// 	switch (stage) {
	// 		case 0:
	// 			return <img src={city} alt='Москва' />
	// 		case 1:
	// 			return <FlightTable flights={flightsToArrive} type='arrival'/>
	// 		default:
	// 			break;
	// 	}
	// }

  return (
    <div className={styles.app}>
			<Stops />
				{/* {
					setRightBlock()
				} */}
				<Reception />
    </div>
  )
}

export default App
