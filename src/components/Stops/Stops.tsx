import { TData } from "../App/App"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { Routes } from "../Routes/Routes"
import { StopTemplate } from "../StopTemplate/StopTemplate"
import styles from './Stops.module.css'

export const Stops = ({ data }: { data: TData}) => {
	const isGoing = data.speed !== 0;
	const stops = data.stops;
	const currStop = stops.find(el => el.time);
	const index = stops.length > 4 ? 0 : stops.length;

	const lineHeight= () => {
		const height = index === 0 ? 436 : 404 - 116*(index+1);
		const heightOnGoing = index === 0 ? 476 : 400 - 108*index;

		if(isGoing) return heightOnGoing > 0 ? heightOnGoing : 0;
		else return height > 0 ? height : 0;
	}
	
	return (
		<div className={styles.leftBlock}>
			{/* <Header el={isGoing ? currStop : } isGoing={isGoing} /> */}
			{
				<>
					{
						index === stops.length ? 
						<Routes stop={index === stops.length ? stops[index-1] : stops[index]} /> :
						<ul className={styles.stops}>
							<svg className={styles.line} width="2" height={lineHeight()} viewBox={`0 0 2 ${lineHeight()}` }fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="2" height={lineHeight()} fill="#D9D9D9"/>
							</svg>
							{
								index === stops.length-1 && !isGoing ? 
								<p className={styles.lastStop}>Конечная</p> :
								stops
									.slice(0, 4)
									.map((el, i) => <StopTemplate key={i} stop={el} isGoing={i === 0  && isGoing} />)
							}
						</ul>
					}
				</>
			}
			<div className={styles.shadow}>
				<Footer data={data} />
			</div>
		</div>
	)
}
