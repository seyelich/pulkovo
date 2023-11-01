import { Footer } from '../Footer/Footer';
import { HeaderForStop } from '../HeaderForStop/HeaderForStop';
import { HeaderForRoute } from '../HeaderFroRoute/HeaderForRoute';
import { Routes } from '../Routes/Routes';
import styles from './LeftBlock.module.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import useLeftContext from '../../hooks/useLeftContext';
import { useRef } from 'react';
import { Stops } from '../Stops/Stops';

export const LeftBlock = () => {
	const { currStop } = useLeftContext();
	const transfers = currStop?.transfers;
	const poi = currStop?.poi;
	const nodeRef = useRef<HTMLDivElement>(null);

	return (
		<SwitchTransition mode="out-in">
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
					{currStop ? <HeaderForStop /> : <HeaderForRoute />}
					{currStop && (transfers || poi)?.length !== 0 ? (
						<Routes />
					) : (
						<Stops />
					)}
					<Footer />
				</div>
			</CSSTransition>
		</SwitchTransition>
	);
};
