import styles from './Stops.module.css';
import { StopTemplate } from '../StopTemplate/StopTemplate';
import useLeftContext from '../../hooks/useLeftContext';

export const Stops = () => {
	const { stops, currStop } = useLeftContext();
	const index = stops.length >= 4 ? 0 : stops.length;
	console.log(stops);

	return (
		<>
			<ul className={styles.stops}>
				{(index === stops.length - 1 && !currStop) ||
				(stops.length === 1 && currStop) ? (
					<p className={styles.lastStop}>Конечная</p>
				) : (
					stops.map((el, i) => {
						const condition = (currStop ? 1 : 0) <= i && i < 4;
						return (
							condition && (
								<StopTemplate
									key={i}
									stop={el}
									isFinal={i === stops.length - 1}
									isLast={i === 3}
									isFirst={i === 0 && !currStop}
								/>
							)
						);
					})
				)}
			</ul>
		</>
	);
};
