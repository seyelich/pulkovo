import { useState, useEffect, useContext } from 'react';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { Reception } from '../Reception/Reception';
import { flightsToArrive } from '../../utils/data';
import { RightContext } from '../../utils/store';
import styles from './RightBlock.module.css';

export const RightBlock = () => {
	const [stage, setStage] = useState(0);
	const { image } = useContext(RightContext);

	useEffect(() => {
		const interval = setInterval(() => {
			stage < 3 && setStage((stage) => stage + 1);
			stage === 3 && setStage(0);
		}, 10000);
		return () => clearInterval(interval);
	}, [stage]);

	const setRightBlock = () => {
		switch (stage) {
			case 0:
				return (
					<div className={styles.imageContainer}>
						<img src={image.src} alt={image.label} />
					</div>
				);
			case 1:
				return <FlightTable flights={flightsToArrive} type="arrival" />;
			case 2:
				return <FlightTable flights={flightsToArrive} type="departure" />;
			case 3:
				return <Reception />;
			default:
				break;
		}
	};
	return setRightBlock();
};
