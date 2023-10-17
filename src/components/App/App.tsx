import styles from './App.module.css'
import city from '../../assets/Pic.png';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { flightsToArrive, stops } from '../../utils/data';
import { StopTemplate } from '../StopTemplate/StopTemplate';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { useEffect, useState } from 'react';

function App() {
	const [stage, setStage] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			stage < 1 && setStage(stage => stage+1);
			stage === 1 && setStage(0);
		}, 10000);
		return () => clearInterval(interval)
	}, [stage]);

	const setLeftBlock = () => {
		switch (stage) {
			case 0:
				return <img src={city} alt='Москва' />
			case 1:
				return <FlightTable flights={flightsToArrive} type='arrival'/>
			default:
				break;
		}
	}

  return (
    <div className={styles.app}>
			<div className={styles.leftBlock}>
				<Header />
				<ul className={styles.stops}>
					<svg className={styles.line} width="2" height="438" viewBox="0 0 2 438" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="2" height="438" fill="#D9D9D9"/>
					</svg>
					{
						stops.map(el => el.time !== 0 && <StopTemplate stop={el} />)
					}
				</ul>
				<div className={styles.shadow}>
					<Footer />
				</div>
			</div>
			<div className={styles.rightBlock}>
				{
					setLeftBlock()
				}
				
      </div>
    </div>
  )
}

export default App
