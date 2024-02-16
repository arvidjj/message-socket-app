
import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from "react-router-dom"
import './App.css'
import Chat from './components/Chat'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/Header'
import { useAuth } from './CurrentUserContext';
import { useCookies } from "react-cookie";

function App() {
  const { fetchCurrentUser } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["jwauth"]);

  useEffect(() => {
    if (cookies.jwauth) {
      fetchCurrentUser();
    }
  } ,[])

  return (
    <>

      <Header />
      <div className='app'>
      <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      <footer className='footer mt-auto'>
        <p>&copy; 2024 Arvid.</p>
      </footer>
    </>
  )
}

export default App
