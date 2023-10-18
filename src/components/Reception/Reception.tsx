import styles from './Reception.module.css'
import arrow from '../../assets/arrow.svg'

export const Reception = () =>{
	return (
		<div className={styles.container}>
			<p className={styles.floor}>3 этаж</p>
			<div className={styles.titleContainer}>
				<p className={styles.title}>Схема стоек регистрации пассажиров</p>
				<p className={styles.titleEng}>Scheme of passenger check-in counters</p>
			</div>
			<div className={styles.enterContainer}>
				<div className={styles.enter}>
					<img src={arrow} />
					<div>
						<p className={styles.par}>Вход</p>
						<p className={styles.parEng}>Enter</p>
					</div>
				</div>
				<div className={styles.titleContainer} style={{width: '450px'}}>
					<p className={styles.par}>Пункт досмотра</p>
					<p className={styles.parEng}>Inspection point</p>
				</div>
				<div className={styles.enter}>
					<img src={arrow} />
					<div>
						<p className={styles.par}>Вход</p>
						<p className={styles.parEng}>Enter</p>
					</div>
				</div>
			</div>
		</div>
	)
}
