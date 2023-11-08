const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Pusher = require('pusher');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pusher = new Pusher({
  appId: 'cd56aaada30e0002e21e',
  key: 'cd56aaada30e0002e21e',
  secret: 'dd4c27c5490dabab67bc',
  cluster: 'us3',
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat', (data) => {
    // Broadcast the message to all connected clients
    io.emit('message', { message: data.message });
  });
});

app.post('/send-message', (req, res) => {
    // Receive and broadcast the message from the client
    const message = req.body.message;
    io.emit('message', { message });
    res.status(200).send('Message sent');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
