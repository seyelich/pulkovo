import { TFlight } from "../../utils/data"
import { FlightLine } from "../FlightLine/FlightLine"
import arrival from '../../assets/arrival.svg'
import departure from '../../assets/departure.svg'
import styles from './FlightsTable.module.css'

export const FlightTable = ({ flights, type }: { flights: TFlight[], type: 'arrival' | 'departure'}) => {
	return (
		<>
				<div className={styles.titleContainer}>
					<img
						src={type === 'arrival' ? arrival : departure}
						alt={type === 'arrival' ? 'Прилёты' : 'Вылеты'}
					/>
					<p className={styles.title}>
						{type === 'arrival' ? 'Прилёты' : 'Вылеты'}
					</p>
				</div>
			<table className={styles.table}>
				<thead className={styles.header}>
						<tr className={styles.headerRow}>
							<th className={styles.time}>Время</th>
							<th className={styles.route}>Рейс</th>
							<th className={styles.direction}>Направление</th>
							<th className={styles.company}>Авиакомпания</th>
							<th className={styles.plane}>Тип самолета</th>
							<th className={styles.status}>Статус</th>
						</tr>
					</thead>
					<tbody>
						{
							flights.map(el => <FlightLine flight={el} />)
						}
					</tbody>
			</table>
		</>
	)
}
