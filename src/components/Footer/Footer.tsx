import styles from './Footer.module.css';

export const Footer = ({ speed }: { speed: number }) => {
	return (
		<div className={styles.footer}>
			<p>11:03</p>
			<p>28.01.2022</p>
			{speed !== 0 && (
				<>
					<p>+23°C</p>
					<p>{speed} км/ч</p>
				</>
			)}
		</div>
	);
};
