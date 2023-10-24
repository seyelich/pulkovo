const { VITE_WS_IP } = import.meta.env;

export const socketUrl = `ws://${VITE_WS_IP}`;
