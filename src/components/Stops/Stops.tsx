import { useEffect, useRef, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { HeaderForStop } from '../HeaderForStop/HeaderForStop';
import { HeaderForRoute } from '../HeaderFroRoute/HeaderForRoute';
import { Routes } from '../Routes/Routes';
import { StopTemplate } from '../StopTemplate/StopTemplate';
import styles from './Stops.module.css';
import {
  CSSTransition, SwitchTransition,
} from 'react-transition-group';
import useLeftContext from '../../hooks/useLeftContext';

export const Stops = () => {
	const { stops, currStop } = useLeftContext();
	
	const [lineHeight, setLineHeight] = useState(0);
	const index = stops.length >= 4 ? 0 : stops.length;
	const transfers = currStop?.transfers;
	const poi = currStop?.poi;
	const listRef = useRef<HTMLUListElement>(null);
	const nodeRef = useRef<HTMLDivElement>(null);
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
		<SwitchTransition mode='out-in' >
			<CSSTransition 
				classNames={{
					enter: styles.leftBlockEnter,
					enterActive: styles.leftBlockEnterActive,
					exit: styles.leftBlockExit,
					exitActive: styles.leftBlockExitActive,
				}} 
				nodeRef={nodeRef} 
				timeout={1000}
				key={!!currStop}
			>
				<div className={styles.leftBlock} ref={nodeRef}>
					{
						currStop ? 
						<HeaderForStop />
						: <HeaderForRoute />
					}
					{
						<>
							{
								currStop && (transfers || poi)?.length !== 0 ? 
								( // неизвестна длительность показа с POI и transfers
									<Routes />
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
										{
											(
												index === stops.length - 1 && !currStop) || stops.length === 1 && currStop ? 
											(
												<p className={styles.lastStop}>Конечная</p>
											) : (
												stops
													.slice(currStop ? 1 : 0, currStop ? 5 : 4)
													.map((el, i) => (
														<StopTemplate
															key={i}
															stop={el}
															isLast={i === stops.length - 1}
															isFirst={i === 0 && !currStop}
														/>
													))
											)
										}
									</ul>
								)
							}
						</>
					}
					<div className={styles.shadow}>
						<Footer />
					</div>
				</div>
			</CSSTransition>
		</SwitchTransition>
	);
};
