import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export const Chat = () => {
  const [message, inputMessage] = useState('');
  const [messages, displayMessages] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('cd56aaada30e0002e21e', {
      cluster: 'us3',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      displayMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      pusher.disconnect();
    };
  }, []);

  return (
    <div>
       {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
    </div>
  );
};

export default Chat;