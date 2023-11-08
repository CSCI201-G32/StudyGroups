const Pusher = require('pusher');

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
