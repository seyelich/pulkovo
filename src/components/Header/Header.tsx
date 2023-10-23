import styles from './Header.module.css';
import { TFullStop } from '../../types';
import { TRoute } from '../../utils/store';

export const Header = ({ el }: { el: TFullStop | TRoute }) => {
	return (el as TRoute).name !== undefined ? (
		<div className={styles.headerOnGoing}>
			<img src={(el as TRoute).icon} alt="route" />
			<p className={styles.titleOnGoing}>{(el as TRoute).name}</p>
		</div>
	) : (
		<div className={styles.header}>
			<h1 className={styles.title}>{(el as TFullStop).nameRus}</h1>
			<p className={styles.titleEng}>{(el as TFullStop).nameEng}</p>
		</div>
	);
};
