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
    <div className="chat-box">
      <div className="message-container">
        {prevMessages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;