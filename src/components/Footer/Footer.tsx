import { TSpeed } from '../../types'
import styles from './Footer.module.css'

export const Footer = ({ data }: { data: TSpeed }) => {
	return (
		<div className={styles.footer}>
			<p>11:03</p>
			<p>28.01.2022</p>
			<p>+23°C</p>
			<p>{data.speed} км/ч</p>
		</div>
	)
}
