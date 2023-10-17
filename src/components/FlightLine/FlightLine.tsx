import { TFlight } from "../../utils/data"
import styles from './FlightLine.module.css'

export const FlightLine = ({ flight }: {flight: TFlight}) => {
	return (
		<tr className={styles.row}>
			<td className={styles.textBold}>{flight.time}</td>
			<td className={styles.textBold}>
				<p className={styles.route}>
					{flight.number_roure}
				</p>
			</td>
			<td className={styles.direction}>{flight.direction}</td>
			<td className={styles.company}>{flight.company}</td>
			<td className={styles.textBold}>{flight.plane_type}</td>
			<td className={styles.status}>{flight.status}</td>
		</tr>
	)
}
