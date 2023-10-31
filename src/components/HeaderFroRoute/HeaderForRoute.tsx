import styles from './HeaderForRoute.module.css';
import useLeftContext from '../../hooks/useLeftContext';

export const HeaderForRoute = () => {
	const { route } = useLeftContext();

	return (
		<div className={styles.header} >
			<img src={route.icon} alt="route" />
			<p className={styles.title}>{route.name}</p>
		</div>
	)
};
