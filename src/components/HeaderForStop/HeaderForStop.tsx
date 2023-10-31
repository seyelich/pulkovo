import styles from './HeaderForStop.module.css';
import useLeftContext from '../../hooks/useLeftContext';
import { useRef } from 'react';

export const HeaderForStop = () => {
	const { currStop, route } = useLeftContext();
	const ref = useRef<HTMLDivElement>(null);
	const container = ref.current;

	const isOverflown = (el: HTMLDivElement) => el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
	const condition = container && isOverflown(container);

	return (
		<div className={styles.header} 
			style={{ backgroundColor: route.color, color: route.fontColor }}
			ref={ref}
		>
			<h1 className={`${styles.title} ${condition && styles.runningLine}`}>{currStop?.nameRus}</h1>
			<p className={`${styles.titleEng} ${condition && styles.runningLine}`}>{currStop?.nameEng}</p>
		</div>
	);
};
