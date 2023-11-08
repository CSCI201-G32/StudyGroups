const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Pusher = require('pusher');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: 'YOUR_APP_KEY',
  secret: 'YOUR_APP_SECRET',
  cluster: 'YOUR_APP_CLUSTER',
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat', (data) => {
    pusher.trigger('chat', 'message', data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
