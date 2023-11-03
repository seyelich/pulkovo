import useRightContext from '../../hooks/useRightContext';
import styles from './MediaContent.module.css';

export const MediaContent = () => {
	const { media } = useRightContext();

	const renderMediaType = () => {
		switch (media.type) {
			case 'img':
				return (
					<img className={styles.image} src={media.src} alt={media.label} />
				);
			case 'video':
				return (
					<video
						className={styles.image}
						autoPlay={true}
						muted
						src={media.src}
						loop
					/>
				);
			case 'emergency':
				return (
					<div>
						<p>{media.header}</p>
						<p>{media.text}</p>
					</div>
				);
			case 'stream':
				return (
					<video
						className={styles.image}
						autoPlay={true}
						muted
						src={media.url}
						crossOrigin="anonymous"
					/>
				);
			case 'ticker':
				return (
					<div>
						<p>{media.text}</p>
					</div>
				);
			default:
				break;
		}
	};

	return <div className={styles.imageContainer}>{renderMediaType()}</div>;
};
