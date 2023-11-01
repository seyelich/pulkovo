import useLeftContext from '../../hooks/useLeftContext';
import { TContextStop } from '../../utils/store';
import styles from './StopTemplate.module.css';

type TStopTemplate = {
	stop: TContextStop;
	isFinal: boolean;
	isLast: boolean;
	isFirst: boolean;
};

export const StopTemplate = ({
	stop,
	isLast,
	isFinal,
	isFirst,
}: TStopTemplate) => {
	const { route, stops, currStop } = useLeftContext();

	return (
		<li className={styles.stop}>
			<div className={styles.timeContainer}>
				<p>{stop.time}</p>
				<p className={styles.minute}>мин</p>
			</div>
			<div
				className={`${styles.circle} ${
					(isLast || isFinal) && styles.circleWithLine
				} ${
					((stops.length < 4 && isFinal) || !!currStop) &&
					styles.circleWithLineFinal
				}`}
			>
				<svg
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="14"
						cy="14"
						r="12"
						fill="#B6E5FF"
						stroke="white"
						strokeWidth="4"
					/>
				</svg>
			</div>
			<div
				className={styles.nameContainer}
				style={
					isFirst
						? { backgroundColor: route.color, color: route.fontColor }
						: undefined
				}
			>
				<p className={styles.name}>{stop.nameRus}</p>
				<p className={styles.nameEng}>{stop.nameEng}</p>
				{isFinal && <p className={styles.lastStop}>Конечная</p>}
			</div>
		</li>
	);
};
