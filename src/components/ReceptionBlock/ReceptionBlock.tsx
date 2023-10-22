import styles from './ReceptionBlock.module.css';
import smallArrow from '../../assets/arrowSmall.svg';
import smallLine from '../../assets/line_reception.svg';
import line from '../../assets/line_reception_l.svg';

export const ReceptionBlock = ({ nums }: { nums: string[] }) => {
	return (
		<div className={styles.block}>
			<div className={styles.arrows}>
				<img src={smallArrow} alt="arrow" />
				<img src={smallArrow} alt="arrow" />
				<img src={smallArrow} alt="arrow" />
			</div>
			{nums
				.map((el, i) => (
					<div className={styles.nums} key={i}>
						<p className={styles.num}>{el}</p>
						<img src={smallLine} />
						<p className={styles.num}>{nums[i + 1]}</p>
					</div>
				))
				.filter((_, i) => i % 2 === 0)}
			<img src={line} className={styles.centralLine} />
			<div className={`${styles.arrows} ${styles.arrowsRight}`}>
				<img src={smallArrow} alt="arrow" />
				<img src={smallArrow} alt="arrow" />
				<img src={smallArrow} alt="arrow" />
			</div>
		</div>
	);
};
