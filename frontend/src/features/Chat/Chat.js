import Pusher from "pusher-js";
import '../../assets/chat/Chat.css';
import {useEffect, useState, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import getCookie from "./Cookie";

function Chat() {
  const[username, setUsername] = useState([]);
  const[messages, setMessages] = useState([])
  const[message, setMessage] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect( () => {

    //Allow the client to connect to API and listen in on an event
    Pusher.logToConsole = true;
    const pusher = new Pusher("f8627fe05e44c2e9db83", {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', handleMessage);

    return () => {
      pusher.unsubscribe('chat');
    };

  }, []);

  const handleMessage = (data) => {
    setMessages(prevMessages => [...prevMessages, data]); 
  };

  const user_id = getCookie("UserID");
  
  //Use middleware to call the servlet and get the username
  const getUsername = async () => {
    try {
      const response = await fetch('http://localhost:8000/servlet/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          user_id,
        })
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json(); 
        console.log(data); 
        return data; 
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  };

  //Get the username (first part of the email) 
  //of the user associated with the current UserID
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        let user = await getUsername();

        if(user === null) {
          user = "Anonymous";
        }

        setUsername(user);
      } catch (error) {
        console.error('Error fetching username:', error);
        throw error
      }
    };
  
    fetchUsername();

  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const mess = String(message).trim();
    const user = String(username).trim();

    if(mess === "" || user === "") {
      return;
    }
    else {
      //Adding a new message to the database
      await fetch('http://localhost:8080/Messages/StoreMessage', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },

        body: JSON.stringify({
          user_id,
          message,
        })
      })

      //Sending the message to pusher API so it can be distributed
      await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          username,
          message,
        })
      })
    }
    setMessage('');
  }

  useEffect(() => {
    handleLoad();
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  //Fetching messages to be displayed when the chat loads
  const handleLoad = async () => {

    try {
      const response = await fetch('http://localhost:8000/servlet/oldmessages', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();

      data.forEach(oldMessage => {
        setMessages(prevMessages => [...prevMessages, oldMessage]);
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }

  };

  return (
    <div className="container">
      <div className="title">
        <h1 className="title">Chat</h1>
      </div>
      <div className="chat-container">
        <div className="messages">
          <div className="messages-content">
            {messages.map((message, index) => (
              <div key={index} className="message-item">
                <strong className="username">{message.username}: </strong>
                <span className="text">{message.message}</span>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input
            className="message-input"
            placeholder="Type message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="chat-send-button">
            <FontAwesomeIcon icon={faPaperPlane} className="send"/>
            <span className="send-text"> Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
