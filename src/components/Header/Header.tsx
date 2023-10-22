import styles from './Header.module.css';
import { TFullStop } from '../../types';

type TRoute = {
	icon: string;
	color: string;
	fontColor: string;
	name: string;
};

const isRoute = (o: object): o is TRoute => true;

export const Header = ({ el }: { el: TFullStop | TRoute }) => {
	return isRoute(el) ? (
		<div className={styles.headerOnGoing} style={{ backgroundColor: el.color }}>
			<img src={el.icon} alt="route" />
			<p className={styles.titleOnGoing}>{el.name}</p>
		</div>
	) : (
		<div className={styles.header}>
			<h1 className={styles.title}>{el.nameRus}</h1>
			<p className={styles.titleEng}>{el.nameEng}</p>
		</div>
	);
};
