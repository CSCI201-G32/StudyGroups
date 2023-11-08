import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import newMessage from '../server';

export const Chat = () => {
  const [message, inputMessage] = useState('');
  const [prevMessages, displayMessages] = useState([]);
  const Pusher = require('pusher');
  
  useEffect(() => {
    const pusher = new Pusher('cd56aaada30e0002e21e', {
      cluster: 'us3',
    });

    const channel = pusher.subscribe('chat');
    channel.bind('newMessage', (data) => {
      const newMessage = JSON.parse(data.message)
      displayMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      pusher.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (message.trim() !== '') {
      await newMessage({ message }); // Call the newMessage function to trigger the event
      inputMessage(''); // Clear the input field after sending the message
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