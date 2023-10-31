import { FlightLine } from '../FlightLine/FlightLine';
import arrival from '../../assets/arrival.svg';
import departure from '../../assets/departure.svg';
import styles from './FlightsTable.module.css';
import useRightContext from '../../hooks/useRightContext';

export const FlightTable = () => {
	const { contents, subtype } = useRightContext().pulkovo;

	return (
		<div className={styles.content}>
			<div className={styles.titleContainer}>
				<img
					src={subtype === 'ARRIVAL' ? arrival : departure}
					alt={subtype === 'ARRIVAL' ? 'Прилёты' : 'Вылеты'}
				/>
				<p className={styles.title}>
					{subtype === 'ARRIVAL' ? 'Прилёты' : 'Вылеты'}
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
					{contents?.map((el, i) => <FlightLine flight={el} key={i} />)}
				</tbody>
			</table>
		</div>
	);
};
