import { stops } from "../../utils/data"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { Routes } from "../Routes/Routes"
import { StopTemplate } from "../StopTemplate/StopTemplate"
import styles from './Stops.module.css'
import { useState, useEffect } from 'react'

export const Stops = ({ isGoing }: { isGoing: boolean}) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			index < stops.length && setIndex(index => index+1);
			index === stops.length && setIndex(0);
		}, 3000);
		return () => clearInterval(interval);
	}, [index]);

	// const lineHeight = !isGoing ? 
	// 	index === 0 ? 436 : 404 - 116*(index+1) : 
	// 	476 - 108*index //exchange hardcored values with heights of blocks
	const height = index === 0 ? 436 : 404 - 116*(index+1);
	const lineHeight = height < 0 ? 0 : height;
	
	return (
		<div className={styles.leftBlock}>
			<Header el={index === stops.length ? stops[index-1] : stops[index]} isGoing={isGoing} />
			{
				// isGoing ?
				
				<>
					{
						index === stops.length ? 
						<Routes stop={index === stops.length ? stops[index-1] : stops[index]} /> :
						<ul className={styles.stops}>
							<svg className={styles.line} width="2" height={lineHeight} viewBox={`0 0 2 ${lineHeight}` }fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="2" height={lineHeight} fill="#D9D9D9"/>
							</svg>
							{
								index === stops.length-1 ? 
								<p className={styles.lastStop}>Конечная</p> :
								stops
									.slice(isGoing ? index : index+1)
									.map((el, i) => <StopTemplate key={i} stop={el} isGoing={i === 0  && isGoing} />)
							}
						</ul>
					}
				</>
			}
			<div className={styles.shadow}>
				<Footer />
			</div>
		</div>
	)
}
