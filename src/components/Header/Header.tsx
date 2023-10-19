import styles from './Header.module.css'
import route from '../../assets/routesIcons/number_Route.png'
import { TFullStop } from '../../types'

export const Header = ({ el, isGoing }: {el: (TFullStop & { time: number }), isGoing: boolean}) => {
	return (
		isGoing ?
		<div className={styles.headerOnGoing}>
			<img src={route} alt='route' />
			<p className={styles.titleOnGoing}>Новособорная — ул. Новая Дорога</p>
		</div> :
		<div className={styles.header}>
			<h1 className={styles.title}>
				{el.nameRus}
			</h1>
			<p className={styles.titleEng}>
				{el.nameEng}
			</p>
		</div>
	)
}
