import styles from './Reception.module.css'
import arrow from '../../assets/arrow.svg'
import { ReceptionBlock } from '../ReceptionBlock/ReceptionBlock'

export const Reception = () => {
	const nums = [
		['01', '10', '11', '20'],
		['21', '32', '33', '44'],
		['45', '56', '57', '68'],
		['69', '78', '79', '88'],
	]
	return (
		<div className={styles.container}>
			<p className={styles.floor}>3 этаж</p>
			<div className={styles.titleContainer}>
				<p className={styles.title}>Схема стоек регистрации пассажиров</p>
				<p className={styles.titleEng}>Scheme of passenger check-in counters</p>
			</div>
			<div className={styles.content}>
				{
					nums.map((arr, i) => <ReceptionBlock key={i} nums={arr} />)
				}
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
