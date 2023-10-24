import styles from './Reception.module.css';
import scheme from '../../assets/pulkovo-scheme.jpg';

export const Reception = () => {
	return (
		<div className={styles.container}>
			<p className={styles.floor}>3 этаж</p>
			<div className={styles.titleContainer}>
				<p className={styles.title}>Схема стоек регистрации пассажиров</p>
				<p className={styles.titleEng}>Scheme of passenger check-in counters</p>
			</div>
			<div className={styles.content}>
				<img className={styles.image} src={scheme} alt='scheme' />
			</div>
			
		</div>
	);
};
