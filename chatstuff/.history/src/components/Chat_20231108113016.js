import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';

export const Chat = () => {

  const [message, inputMessage] = useState('');
  const [prevMessages, displayMessages] = useState([]);
  const channelRef = useRef(null);

  useEffect(() => {
    const pusher = new Pusher('cd56aaada30e0002e21e', {
      cluster: 'us3',
    });
    
    const channel = pusher.subscribe('presence-chat');
    // const channel1 = pusher.subscribe('chat');
    
    channel.bind('client-message', (data) => {
      const newMessage = data;
      displayMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // channel1.bind('message', (data) => {
    //   const newMessage = data;
    //   displayMessages((prevMessages) => [...prevMessages, newMessage]);
    // });

    channelRef.current = channel;

    return () => {
      pusher.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (message.trim() !== '') {
      await channelRef.current.trigger('client-message', {
        message,
      });
      inputMessage('');
    }
  };

  return (
    <div>
      {prevMessages.map((msg, index) => (<div key={index}>{msg}</div>))}
      <input
        type="text"
        value={message}
        onChange={(e) => inputMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default Chat;
