import styles from './Header.module.css'
import { stops } from '../../utils/data'

export const Header = () => {
	return (
		<div className={styles.header}>
			<h1 className={styles.title}>
				{stops[0].name}
			</h1>
			<p className={styles.titleEng}>
				{stops[0].name_en}
			</p>
		</div>
	)
}
