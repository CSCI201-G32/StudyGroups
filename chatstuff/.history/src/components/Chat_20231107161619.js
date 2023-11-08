import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

export const Chat = () => {
  const [message, inputMessage] = useState('');
  const [prevMessages, displayMessages] = useState([]);

  const handleInputChange = (e) => {
    inputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Assuming you want to send the newMessage to your server using Pusher
    pusher.trigger('chat', 'message', {
      message: JSON.stringify(data),
    });
    inputMessage(''); // Clear the input field after sending the message
  };

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
      {prevMessages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      <input
        type="text"
        value={newMessage}
        onChange={handleInputChange}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;