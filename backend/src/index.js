const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const { initSocket } = require('./services/socketService');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

initSocket(io);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use('/api', routes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Fleet Management backend listening on port ${PORT}`);
});
