import { useEffect, useRef } from 'react';
import { FlightTable } from '../FlightsTable/FlightsTable';
import styles from './RightBlock.module.css';
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import useRightContext from '../../hooks/useRightContext';
import { MediaContent } from '../MediaContent/MediaContent';

export const RightBlock = ({
	sendMessage,
}: {
	sendMessage: SendJsonMessage;
}) => {
	const { media, pulkovo, type } = useRightContext();
	const nodeRef = useRef<HTMLDivElement>(null);

	const timer = (label: string, duration: number) =>
		setTimeout(() => {
			sendMessage({
				type: 'COMPLETE',
				label: label,
			});
			console.log('Message is sent');
		}, duration * 1000);

	useEffect(() => {
		const contentTimer =
			type === 'pulkovo'
				? timer(pulkovo.subtype, pulkovo.duration)
				: timer(media.label, media.length);
		return () => clearTimeout(contentTimer);
	}, [pulkovo, media, type]);

	return (
		<SwitchTransition mode="out-in">
			<CSSTransition
				classNames={{
					enter: styles.rightBlockEnter,
					enterActive: styles.rightBlockEnterActive,
					exit: styles.rightBlockExit,
					exitActive: styles.rightBlockExitActive,
				}}
				nodeRef={nodeRef}
				timeout={1000}
				key={type + media.src + pulkovo.subtype}
			>
				<div className={styles.rightBlock} ref={nodeRef}>
					{type === 'media' ? (
						<MediaContent />
					) : pulkovo.subtype === 'ARRIVAL' ||
					  pulkovo.subtype === 'DEPARTURE' ? (
						<FlightTable />
					) : (
						<div className={styles.imageContainer}>
							<img
								className={styles.image}
								src={pulkovo.src}
								alt={pulkovo.subtype}
							/>
						</div>
					)}
				</div>
			</CSSTransition>
		</SwitchTransition>
	);
};
