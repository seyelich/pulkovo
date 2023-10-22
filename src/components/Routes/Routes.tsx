import styles from './Routes.module.css';
import { TTransfer } from '../../types';
import { useEffect, useRef } from 'react';

const { VITE_ICONS_URL } = import.meta.env;

export const Routes = ({
	transfers,
	isLast,
}: {
	transfers: TTransfer[];
	isLast: boolean;
}) => {
	const lastRef = useRef<HTMLLIElement>(null);
	const firstRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (transfers.find((el) => el.icons.length > 14)) {
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
	}, [transfers]);

	return (
		<div className={styles.container}>
			{isLast && <p className={styles.finalStop}>Конечная</p>}
			<div className={styles.iconsContainer}>
				{transfers.map((el, iu) => {
					return (
						<div className={styles.row}>
							<img className={styles.icon} src={el.icons[0]} alt="Тип ТС" />
							<ul
								key={iu}
								className={`${styles.list} ${el.nameRus && styles.listMetro}`}
							>
								{el.icons.slice(1).map((icon, il) => (
									<li key={il} ref={il === 0 ? firstRef : lastRef}>
										<img
											className={styles.icon}
											src={VITE_ICONS_URL + '/' + icon}
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
