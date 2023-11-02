import { FlightLine } from '../FlightLine/FlightLine';
import arrival from '../../assets/arrival.svg';
import departure from '../../assets/departure.svg';
import styles from './FlightsTable.module.css';
import useRightContext from '../../hooks/useRightContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useRef, useState, useEffect } from 'react';
import { TFlight } from '../../types';

export const FlightTable = () => {
	const { contents, subtype, duration } = useRightContext().pulkovo;
	const nodeRef = useRef<HTMLTableSectionElement>(null);
	const [chunkNumber, setChunkNumber] = useState(0);

	const flightLength = contents?.length;
	const chunkSize = 7;
	const arr =
		flightLength && flightLength > chunkSize
			? sliceIntoChunks(contents, chunkSize)
			: [contents];
	const tableShowDuration = arr && duration / arr.length;
	const currTable = arr[chunkNumber];

	function sliceIntoChunks(arr: TFlight[], chunkSize: number) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}

	useEffect(() => {
		const timer = setTimeout(
			() => setChunkNumber((num) => num + 1),
			tableShowDuration && tableShowDuration * 1000
		);
		return () => clearTimeout(timer);
	}, [tableShowDuration]);

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
			<SwitchTransition mode="out-in">
				<CSSTransition
					key={chunkNumber}
					classNames={{
						enter: styles.tableBodyEnter,
						enterActive: styles.tableBodyEnterActive,
						exit: styles.tableBodyExit,
						exitActive: styles.tableBodyExitActive,
					}}
					nodeRef={nodeRef}
					timeout={1000}
				>
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
						<tbody ref={nodeRef}>
							{currTable &&
								currTable.map((el, i) => <FlightLine flight={el} key={i} />)}
						</tbody>
					</table>
				</CSSTransition>
			</SwitchTransition>
		</div>
	);
};
