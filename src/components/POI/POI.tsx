import { TPoi } from '../../types';

export const POI = ({ POIs }: { POIs: TPoi[] }) => {
	return (
		<div>
			<ul>
				{POIs.map((el, i) => (
					<li key={i}>
						<p>{el.name}</p>
						<img src={el.icon} alt={el.name} />
					</li>
				))}
			</ul>
		</div>
	);
};
