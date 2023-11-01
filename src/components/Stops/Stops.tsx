import { useEffect, useRef, useState } from 'react';
import styles from './Stops.module.css';
import { StopTemplate } from '../StopTemplate/StopTemplate';
import useLeftContext from '../../hooks/useLeftContext';

export const Stops = () => {
	const [lineHeight, setLineHeight] = useState(0);
	const { stops, currStop } = useLeftContext();

	const index = stops.length >= 4 ? 0 : stops.length;
	const ref = useRef<HTMLUListElement>(null);
	const listHeight = ref?.current?.clientHeight;
	const listElHeight = ref?.current?.querySelector('li')?.clientHeight;

	useEffect(() => {
		if (stops.length >= 4 && listHeight) {
			setLineHeight(listHeight);
		} else if (stops.length < 4 && listElHeight) {
			setLineHeight(
				listElHeight * (index - (currStop ? 1.5 : 0.5)) + 24 * (index - 1)
			);
		} else if (stops.length === 1 && currStop) {
			setLineHeight(0);
		}
	}, [index, listHeight, listElHeight]);

	return (
		<>
			<ul className={styles.stops} ref={ref}>
				<svg
					className={styles.line}
					width="2"
					height={lineHeight}
					viewBox={`0 0 2 ${lineHeight}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="2" height={lineHeight} fill="#D9D9D9" />
				</svg>
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
									isLast={i === stops.length - 1}
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
