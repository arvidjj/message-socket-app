import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../CurrentUserContext';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io.connect('http://localhost:4000');

  const { currentUser } = useAuth();

  const fetchMessages = async () => {
    const response = await fetch('http://localhost:3000/messages', { credentials: 'include', method: 'GET' });
    const data = await response.json();
    setMessages(data);
  }

  useEffect(() => {
    // Attach event listener for receiving messages
    socket.on('receive_message', handleMessage);

    // Fetch messages from the server
    fetchMessages();

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
    socket.emit('send_message', { body: message, userId: currentUser.userId});
    handleMessage({ body: message, username: currentUser.username});
    setMessage('');
  };

  const handleMessage = (data) => {
    // Update state with the new message
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  return (
    <div className='flex flex-col items-stretch justify-stretch'>
      <h1>{typingUser ? `Writing to ${typingUser}` : 'Chat'}</h1>
        <div className="chat-area h-full">
          {/* Display messages from state */}
          {messages.map((msg, index) => (
            <p key={index}>{msg.username}: {msg.body}</p>
          ))}
        </div>
      <div className="input-area flex">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className='flex-1'
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
