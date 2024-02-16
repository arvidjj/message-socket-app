import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../CurrentUserContext';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io.connect('http://localhost:4000');

  const { currentUser } = useAuth();

  useEffect(() => {
    // Attach event listener for receiving messages
    socket.on('receive_message', handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('receive_message', handleMessage);
    };
  }, [socket]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    // Emit the message to the server
    socket.emit('send_message', { message });
    handleMessage({ message });
    setMessage('');
  };

  const handleMessage = (data) => {
    // Update state with the new message
    setMessages((prevMessages) => [...prevMessages, data.message]);
  };

  return (
    <div>
      <h1>{typingUser ? `Writing to ${typingUser}` : 'Chat'}</h1>
      <div className="chat-area">
        {/* Display messages from state */}
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
