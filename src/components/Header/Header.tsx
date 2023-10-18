import styles from './Header.module.css'
import { TStop } from '../../utils/data'
import route from '../../assets/routesIcons/number_Route.png'

export const Header = ({ el, isGoing }: {el: TStop, isGoing: boolean}) => {
	return (
		isGoing ?
		<div className={styles.headerOnGoing}>
			<img src={route} alt='route' />
			<p className={styles.titleOnGoing}>Новособорная — ул. Новая Дорога</p>
		</div> :
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
