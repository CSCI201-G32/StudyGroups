import React, { useEffect } from 'react';
import Pusher from 'pusher-js';

export const Chat = () => {
  useEffect(() => {
    const pusher = new Pusher('cd56aaada30e0002e21e', {
      cluster: 'us3',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      // Handle incoming chat messages
    });

    return () => {
      pusher.disconnect();
    };
  }, []);

  return (
    <div>
    
    </div>
  );
};

export default Chat;
