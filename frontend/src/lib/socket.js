import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:4000');

export const subscribeToNotifications = (callback) => {
  socket.on('notification', callback);
};

export const joinRoom = (room) => {
  socket.emit('subscribe', room);
};

export default socket;
