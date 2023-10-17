import { TStop } from "../../utils/data"
import styles from './StopTemplate.module.css'

export const StopTemplate = ({ stop } : { stop: TStop }) => {
	return (
		<li className={styles.stop}>
			<div className={styles.timeContainer}>
				<p>{stop.time}</p>
				<p className={styles.minute}>мин</p>
			</div>
			<svg className={styles.circle} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="14" cy="14" r="12" fill="#B6E5FF" stroke="white" stroke-width="4"/>
			</svg>
			<div>
				<p className={styles.name}>{stop.name}</p>
				<p className={styles.name_en}>{stop.name_en}</p>
			</div>
		</li>
	)
}
