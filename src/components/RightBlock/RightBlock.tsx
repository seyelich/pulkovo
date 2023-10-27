import { useEffect, useContext, useRef } from 'react';
import { FlightTable } from '../FlightsTable/FlightsTable';
import { RightContext } from '../../utils/store';
import styles from './RightBlock.module.css';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const RightBlock = ({
	sendMessage,
}: {
	sendMessage: SendJsonMessage;
}) => {
	const { media, pulkovo, type } = useContext(RightContext);
	const nodeRef = useRef<HTMLDivElement>(null);

	const timer = (label: string, duration: number) => setTimeout(() => {
		sendMessage({
			type: 'COMPLETE',
			label: label,
		});
		console.log('Message is sent');
	}, duration * 1000);

	useEffect(() => {
		const contentTimer = type === 'pulkovo' ? timer(pulkovo.subtype, pulkovo.duration) : timer(media.label, media.length);
		return () => clearTimeout(contentTimer);
	}, [pulkovo, media, type]);

	return (
		<SwitchTransition mode='out-in'>
			<CSSTransition 
				classNames={{
					enter: styles.rightBlockEnter,
					enterActive: styles.rightBlockEnterActive,
					exit: styles.rightBlockExit,
					exitActive: styles.rightBlockExitActive,
				}} 
				nodeRef={nodeRef} 
				timeout={1000}
				key={type && pulkovo.subtype && media.type}
			>
				<div className={styles.rightBlock} ref={nodeRef}>
					{
						type === 'media' ? (
							<div className={styles.imageContainer}>
								{
									media.type === 'img' ?
									<img className={styles.image} src={media.src} alt={media.label} /> :
									<video className={styles.image} autoPlay={true} muted src={media.src} />
								}
							</div>
						) : (
							pulkovo.subtype === 'ARRIVAL' || pulkovo.subtype === 'DEPARTURE' ? 
							<FlightTable flights={pulkovo.contents!} type={pulkovo.subtype} />
							: <div className={styles.imageContainer}>
									<img className={styles.image} src={pulkovo.src} alt={pulkovo.subtype} />
								</div>
						)
					}
				</div>
			</CSSTransition>
		</SwitchTransition>
	)
};
