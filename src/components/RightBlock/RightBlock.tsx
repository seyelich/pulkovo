import { useState, useEffect, useContext } from 'react';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { Reception } from '../Reception/Reception';
import { flightsToArrive } from '../../utils/data';
import { RightContext } from '../../utils/store';
import styles from './RightBlock.module.css';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';

export const RightBlock = ({
	sendMessage,
}: {
	sendMessage: SendJsonMessage;
}) => {
	const [isShown, setIsShown] = useState(true);
	const { media } = useContext(RightContext);

	//@TODO: refactor flights, add duration for flights and reception

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsShown(false);
			sendMessage({
				type: 'COMPLETE',
				label: media.label,
			});
		}, media.length * 1000);
		return () => clearTimeout(timeout);
	}, []);

	return isShown ? (
		<div className={styles.imageContainer}>
			<img className={styles.image} src={media.src} alt={media.label} />
		</div>
	) : (
		<FlightTable flights={flightsToArrive} type="arrival" />
	);
};
