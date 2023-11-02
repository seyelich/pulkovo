import { TFlight } from '../../types';
import styles from './FlightLine.module.css';

export const FlightLine = ({ flight }: { flight: TFlight }) => {
	const setStatusStyle = () => {
		if (flight.status.includes('Задерживается')) return styles.statusRed;
		else if (flight.status.includes('Прибыл')) return styles.statusGreen;
	};

	return (
		<tr className={styles.row}>
			<td className={styles.textBold}>{flight.time}</td>
			<td className={styles.textBold}>
				<p className={styles.route}>{flight.flightNumber}</p>
			</td>
			<td className={styles.direction}>{flight.direction}</td>
			<td className={styles.company}>{flight.airline}</td>
			<td className={styles.textBold}>{flight.aircraftType}</td>
			<td className={`${styles.status} ${setStatusStyle()}`}>
				{flight.status}
			</td>
		</tr>
	);
};
