import styles from './Footer.module.css'

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<p>11:03</p>
			<p>28.01.2022</p>
			<p>+23°C</p>
			<p>17 км/ч</p>
		</div>
	)
}
