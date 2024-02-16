import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../CurrentUserContext';

const Header = () => {
    const navigate = useNavigate();

    const { currentUser } = useAuth();


  return (
    <header className='flex '>
        <div className='flex-1'>
            <a href="/">LOGO</a>
        </div>

      <h1>Messaging App</h1>

      {currentUser ? (
        <div>
          <p>{currentUser.username}</p>
        <button onClick={() => navigate('/login')}>Logout</button>
        </div>
      ) : (
        <div>
          <a href="/login"><button>Login</button></a>
          <a href="/register"><button>Sign up</button></a>
        </div>
      )}

    </header>
  );
};

export default Header;
