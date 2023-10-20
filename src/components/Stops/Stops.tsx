import { useContext } from 'react'
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { Routes } from "../Routes/Routes"
import { StopTemplate } from "../StopTemplate/StopTemplate"
import styles from './Stops.module.css'
import { RouteContext } from '../../utils/store'

export const Stops = () => {
	const { route, speed, stops, currStop } = useContext(RouteContext)
	const isGoing = speed !== 0;
	const index = stops.length > 4 ? 0 : stops.length;
	const transfers = currStop?.transfers;

	const lineHeight= () => {
		const height = index === 0 ? 436 : 404 - 116*(index+1); //use height of blocks
		const heightOnGoing = index === 0 ? 476 : 400 - 108*index;

		if(isGoing) return heightOnGoing > 0 ? heightOnGoing : 0;
		else return height > 0 ? height : 0;
	}
	
	return (
		<div className={styles.leftBlock}>
			<Header el={currStop ? currStop : route} />
			{
				<>
					{
						currStop && transfers ? 
						<Routes transfers={transfers} isLast={currStop?.index === stops.length-1} /> :
						<ul className={styles.stops}>
							<svg
								className={styles.line}
								width="2" height={lineHeight()}
								viewBox={`0 0 2 ${lineHeight()}`}
								fill="none" xmlns="http://www.w3.org/2000/svg"
							>
								<rect width="2" height={lineHeight()} fill="#D9D9D9"/>
							</svg>
							{
								index === stops.length-1 && !isGoing ? 
								<p className={styles.lastStop}>Конечная</p> :
								stops
									.slice(0, 4)
									.map((el, i) => 
										<StopTemplate 
											key={i} 
											stop={el} 
											isGoing={i === 0  && isGoing} 
											isLast={i === stops.length-1} 
										/>
									)
							}
						</ul>
					}
				</>
			}
			<div className={styles.shadow}>
				<Footer speed={speed} />
			</div>
		</div>
	)
}
