import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

  return (
    <header className='flex '>
        <div className='flex-1'>
            <a href="/">LOGO</a>
        </div>

      <h1>Messaging App</h1>
      <a href="/register"><button>Sign up</button></a>
      <a href="/login"><button>Login</button></a>
    </header>
  );
};

export default Header;
