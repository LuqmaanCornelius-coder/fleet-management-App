let io;

const initSocket = (server) => {
  io = server;
  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);
    socket.on('subscribe', (room) => socket.join(room));
    socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
  });
};

const broadcastNotification = ({ title, message, userIds = [] }) => {
  const payload = { title, message, timestamp: new Date().toISOString() };
  if (userIds.length) {
    userIds.forEach((id) => io.to(id).emit('notification', payload));
  } else {
    io.emit('notification', payload);
  }
};

module.exports = { initSocket, broadcastNotification };
