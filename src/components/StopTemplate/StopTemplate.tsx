import { TContextStop } from '../../utils/store';
import styles from './StopTemplate.module.css';

type TStopTemplate = {
	stop: TContextStop;
	isLast: boolean;
	isFirst: boolean;
};

export const StopTemplate = ({ stop, isLast, isFirst }: TStopTemplate) => {
	return (
		<li className={styles.stop}>
			<div className={styles.timeContainer}>
				<p>{stop.time}</p>
				<p className={styles.minute}>мин</p>
			</div>
			<svg
				className={styles.circle}
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
			<div
				className={`${styles.nameContainer} ${
					isFirst && styles.nameContainerFirst
				}`}
			>
				<p className={styles.name}>{stop.nameRus}</p>
				<p className={styles.nameEng}>{stop.nameEng}</p>
				{isLast && <p className={styles.lastStop}>Конечная</p>}
			</div>
		</li>
	);
};
