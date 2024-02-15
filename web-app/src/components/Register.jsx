import React, { useState } from 'react';
import apiInstance from '../../apiInstance';

const Register = () => {
    const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send username and password to the server
    console.log('Username:', username);
    console.log('Password:', password);
    try {
        const response = await apiInstance.post('/users', {email, username , password })
        console.log(response)
    }
    catch (error) {
        console.error(error)
    }

  };

  return (
    <form onSubmit={handleSubmit}>
    <label>
        Email:
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
