import useRightContext from '../../hooks/useRightContext';
import styles from './MediaContent.module.css';

export const MediaContent = () => {
	const { media } = useRightContext();

	return (
		<div className={styles.imageContainer}>
			{media.type === 'img' ? (
				<img className={styles.image} src={media.src} alt={media.label} />
			) : (
				<video
					className={styles.image}
					autoPlay={true}
					muted
					src={media.src}
					loop
				/>
			)}
		</div>
	);
};
