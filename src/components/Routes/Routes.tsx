import busIcon from '../../assets/icon_Bus.png'
import trolleyIcon from '../../assets/icon_Trolley.png'
import metroIcon from '../../assets/icon_Metro.svg'
import { icons } from '../../utils/data'
import styles from './Routes.module.css'
import { TFullStop } from '../../types'

export const Routes = ({ stop }: { stop:  (TFullStop & { time: number }) }) => {
	const setIcons = (arr: string[], type: 'Bus' | 'Trolley' | 'Metro') => {
		let icon = '';

		switch (type) {
			case 'Bus':
				icon = busIcon
				break;
			case 'Trolley':
				icon = trolleyIcon
				break;
			case 'Metro':
				icon = metroIcon
				break;
		}
		
		return (
			<div className={styles.iconsContainer}>
				<img src={icon} alt={type} />
				<ul className={`${styles.list} ${type === 'Metro' && styles.listMetro}`}>
					{
						arr.map((el: string, i) => <li key={i}><img src={el} alt='Номер маршрута' /></li>)
					}
				</ul>
				{
					type === 'Metro' &&
					<div>
						<p className={styles.station}>Каланчёвская</p>
						<p className={styles.stationEng}>Kalanchevskaya</p>
					</div>
				}
			</div>
		)
	}
	
	return (
		<div className={styles.container}>
			{/* {
				stop.isLast &&
				<p className={styles.finalStop}>Конечная</p>
			} */}
			{ setIcons(icons.slice(0, 12), 'Bus') }
			{ setIcons(icons.slice(12, 14), 'Trolley') }
			{ setIcons(icons.slice(14, 16), 'Metro') }
		</div>
	)
}
