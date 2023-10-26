import { useContext, useEffect, useRef, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { StopTemplate } from '../StopTemplate/StopTemplate';
import styles from './Stops.module.css';
import { LeftContext } from '../../utils/store';

export const Stops = () => {
	const { route, speed, stops, currStop, temperature } =
		useContext(LeftContext);
	const [lineHeight, setLineHeight] = useState(0);
	const index = stops.length >= 4 ? 0 : stops.length;
	const transfers = currStop?.transfers;
	const poi = currStop?.poi;
	const listRef = useRef<HTMLUListElement>(null);
	const listHeight = listRef?.current?.clientHeight;
	const listElHeight = listRef?.current?.querySelector('li')?.clientHeight;

	useEffect(() => {
		if (stops.length >= 4 && listHeight) {
			setLineHeight(listHeight)
		}
		else if (stops.length < 4 && listElHeight) {
			setLineHeight(listElHeight * (index - (currStop ? 1.5 : 0.5)) + 24 * (index - 1))
		} else if (stops.length === 1 && currStop) {
			setLineHeight(0)
		}
	}, [index, listHeight, listElHeight]);

	return (
		<div className={styles.leftBlock}>
			<Header el={currStop ? currStop : route} />
			{
				<>
					{currStop && (transfers || poi)?.length !== 0 ? ( // неизвестна длительность показа с POI и transfers
						<Routes
							transfers={transfers!}
							isLast={currStop?.index === stops.length - 1}
						/>
					) : (
						<ul className={styles.stops} ref={listRef}>
							<svg
								className={styles.line}
								width="2"
								height={lineHeight}
								viewBox={`0 0 2 ${lineHeight}`}
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect width="2" height={lineHeight} fill="#D9D9D9" />
							</svg>
							{(index === stops.length - 1 && !currStop) || stops.length === 1 && currStop ? (
								<p className={styles.lastStop}>Конечная</p>
							) : (
								stops
									.slice(currStop ? 1 : 0, currStop ? 5 : 4)
									.map((el, i) => (
										<StopTemplate
											key={i}
											stop={el}
											isLast={i === stops.length - 1}
										/>
									))
							)}
						</ul>
					)}
				</>
			}
			<div className={styles.shadow}>
				<Footer speed={speed} temperature={temperature} />
			</div>
		</div>
	);
};
