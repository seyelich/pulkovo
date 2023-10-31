import useLeftContext from '../../hooks/useLeftContext';
import styles from './Footer.module.css';

export const Footer = () => {
	const { speed, temperature } = useLeftContext();
	
	const getTime = () => {
		const date = new Date();

		const writeCorrect = (str: number) => {
			return str <= 9 ? `0${str}` : str;
		};

		const hours = writeCorrect(date.getHours());
		const minutes = writeCorrect(date.getMinutes());
		const day = writeCorrect(date.getDate());
		const month = writeCorrect(date.getMonth());
		const year = date.getFullYear();

		return {
			time: `${hours}:${minutes}`,
			date: `${day}.${month}.${year}`,
		};
	};

	return (
		<div className={styles.footer}>
			<p>{getTime().time}</p>
			<p>{getTime().date}</p>
			{temperature !== 0 && <p>{temperature}°C</p>}{' '}
			{/* не показывается, т.к. пакет TEMPERATURE не приходит с бэка*/}
			{speed !== 0 && <p>{speed} км/ч</p>}
		</div>
	);
};
