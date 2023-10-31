import styles from './Routes.module.css';
import { useEffect, useRef } from 'react';
import useLeftContext from '../../hooks/useLeftContext';

const { VITE_ICONS_URL } = import.meta.env;

export const Routes = () => {
	const { currStop, stops } = useLeftContext();
	const isLast = currStop?.index === stops.length - 1;
	const lastRef = useRef<HTMLLIElement>(null);
	const firstRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (currStop?.transfers.find((el) => el.icons.length > 14)) {
			setInterval(() => {
				lastRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
				firstRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}, 10000);
		}
	}, [currStop]);

	return (
		<div className={styles.container}>
			{isLast && <p className={styles.finalStop}>Конечная</p>}
			<div className={styles.iconsContainer}>
				{currStop?.transfers.map((el, iu) => {
					return (
						<div className={styles.row} key={iu}>
							<img
								className={styles.icon}
								src={VITE_ICONS_URL + el.icons[0]}
								alt="Тип ТС"
							/>
							<ul
								className={`${styles.list} ${el.nameRus && styles.listMetro}`}
							>
								{el.icons.slice(1).map((icon, il) => (
									<li key={il} ref={il === 0 ? firstRef : lastRef}>
										<img
											className={styles.icon}
											src={VITE_ICONS_URL + icon}
											alt="Номер маршрута"
										/>
									</li>
								))}
								{el.nameRus && (
									<div>
										<p className={styles.station}>{el.nameRus}</p>
										<p className={styles.stationEng}>{el.nameEng}</p>
									</div>
								)}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
};
