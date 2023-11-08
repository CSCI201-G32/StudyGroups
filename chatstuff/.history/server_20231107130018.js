const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1692543',
  key: 'cd56aaada30e0002e21e',
  secret: 'dd4c27c5490dabab67bc',
  cluster: 'us3',
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('chat', (data) => {
    pusher.trigger('chat', 'message', data);
  });
});
