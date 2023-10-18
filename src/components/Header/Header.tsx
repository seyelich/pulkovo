import styles from './Header.module.css'
import { TStop } from '../../utils/data'

export const Header = ({ el }: {el: TStop}) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.title}>
				{el.name}
			</h1>
			<p className={styles.titleEng}>
				{el.name_en}
			</p>
		</div>
	)
}
