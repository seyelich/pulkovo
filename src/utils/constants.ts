const { VITE_WS_ID } = import.meta.env;

export const socketUrl = `ws://${VITE_WS_ID}`;
