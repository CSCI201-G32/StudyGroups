import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export const Chat = () => {
  const [message, inputMessage] = useState('');
  const [prevMessages, displayMessages] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('cd56aaada30e0002e21e', {
      cluster: 'us3',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      const newMessage = JSON.parse(data.message)
      displayMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      pusher.disconnect();
    };
  }, []);

  return (
    <div>
       {prevMessages.map((msg, index) => (<div key={index}>{msg}</div>))}

    </div>
  );
};

export default Chat;