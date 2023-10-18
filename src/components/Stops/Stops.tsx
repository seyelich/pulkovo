import { stops } from "../../utils/data"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { Routes } from "../Routes/Routes"
import { StopTemplate } from "../StopTemplate/StopTemplate"
import styles from './Stops.module.css'
import { useState, useEffect } from 'react'

export const Stops = () => {
	const [index, setIndex] = useState(0);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		index < stops.length && setIndex(index => index+1);
	// 		index === stops.length - 1 && setIndex(0);
	// 	}, 10000);
	// 	return () => clearInterval(interval);
	// }, [index]);

	// console.log(stops[index], index)
	
	return (
		<div className={styles.leftBlock}>
			<Header el={stops[index]} />
			<Routes />
			{/* <ul className={styles.stops}>
				<svg className={styles.line} width="2" height="438" viewBox="0 0 2 438" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="2" height="438" fill="#D9D9D9"/>
				</svg>
				{
					stops
						.slice(index+1)
						.map(el => el.time !== index && <StopTemplate stop={el} />)
				}
			</ul> */}
			<div className={styles.shadow}>
				<Footer />
			</div>
		</div>
	)
}
