import { useContext, useEffect, useRef, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Routes } from '../Routes/Routes';
import { StopTemplate } from '../StopTemplate/StopTemplate';
import styles from './Stops.module.css';
import { LeftContext } from '../../utils/store';

export const Stops = () => {
	const { route, speed, stops, currStop } = useContext(LeftContext);
	const [ lineHeight, setLineHeight ] = useState(0);
	const index = stops.length >= 4 ? 0 : stops.length;
	const transfers = currStop?.transfers;
	const listRef = useRef<HTMLUListElement>(null);
	const listElRef = useRef<HTMLLIElement>(null);
	const listHeight = listRef?.current?.clientHeight;
	const listElHeight = listElRef?.current?.clientHeight;
	// console.log(listHeight, listElHeight);

	useEffect(() => {
		const h = listHeight && listElHeight && listHeight - listElHeight * index;
		setLineHeight(lineHeight => h? h : lineHeight);
	}, [index, listHeight, listElHeight])

	return (
		<div className={styles.leftBlock}>
			<Header el={currStop ? currStop : route} />
			{
				<>
					{currStop && transfers?.length !== 0 ? (
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
							{index === stops.length - 1 && !currStop ? (
								<p className={styles.lastStop}>Конечная</p>
							) : (
								stops
									.slice(currStop ? 1 : 0, 4)
									.map((el, i) => (
										<StopTemplate
											key={i}
											stop={el}
											isLast={i === stops.length - 1}
											ref={listElRef}
										/>
									))
							)}
						</ul>
					)}
				</>
			}
			<div className={styles.shadow}>
				<Footer speed={speed} />
			</div>
		</div>
	);
};
