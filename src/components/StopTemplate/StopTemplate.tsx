import { TContextStop } from '../../utils/store';
import styles from './StopTemplate.module.css';

type TStopTemplate = {
	stop: TContextStop;
	isGoing: boolean;
	isLast: boolean;
};

export const StopTemplate = ({ stop, isGoing, isLast }: TStopTemplate) => {
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
			<div className={isGoing ? styles.textOnGoing : undefined}>
				<p className={`${styles.name} ${isGoing && styles.nameOnGoing}`}>
					{stop.nameRus}
				</p>
				<p className={styles.name_en}>{stop.nameEng}</p>
				{isLast && <p className={styles.lastStop}>Конечная</p>}
			</div>
		</li>
	);
};
