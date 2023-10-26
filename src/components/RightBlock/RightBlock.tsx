import { useEffect, useContext } from 'react';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { RightContext } from '../../utils/store';
import styles from './RightBlock.module.css';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';

export const RightBlock = ({
	sendMessage,
}: {
	sendMessage: SendJsonMessage;
}) => {
	const { media, pulkovo, type } = useContext(RightContext);

	const timer = (label: string, duration: number) => setTimeout(() => {
		sendMessage({
			type: 'COMPLETE',
			label: label,
		});
		console.log('Message is sent');
	}, duration * 1000);

	useEffect(() => {
		const contentTimer = type === 'pulkovo' ? timer(pulkovo.subtype, pulkovo.duration) : timer(media.label, media.length);
		return () => clearTimeout(contentTimer);
	}, [pulkovo, media, type]);

	return type === 'media' ? (
		<div className={styles.imageContainer}>
			<img className={styles.image} src={media.src} alt={media.label} />
		</div>
	) : (
		pulkovo.subtype === 'ARRIVAL' || pulkovo.subtype === 'DEPARTURE' ? 
		<FlightTable flights={pulkovo.contents!} type={pulkovo.subtype} />
		: <div className={styles.imageContainer}>
				<img className={styles.image} src={pulkovo.src} alt={pulkovo.subtype} />
			</div>
	);
};
