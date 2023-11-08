const express = require('express');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: 'cd56aaada30e0002e21e',
  key: 'cd56aaada30e0002e21e',
  secret: 'dd4c27c5490dabab67bc',
  cluster: 'us3',
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
