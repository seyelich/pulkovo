const { VITE_WS_IP } = import.meta.env;

export const socketUrl = `ws://${VITE_WS_IP}`;
export const pulkovoSubtypes = {
	ARRIVAL: 'ARRIVAL',
	DEPARTURE: 'DEPARTURE',
	COUNTERS: 'COUNTERS',
} as {
	ARRIVAL: 'ARRIVAL',
	DEPARTURE: 'DEPARTURE',
	COUNTERS: 'COUNTERS',
}

export const rightContentTypes = {
	media: 'media',
	pulkovo: 'pulkovo'
} as {
	media: 'media',
	pulkovo: 'pulkovo'
}

