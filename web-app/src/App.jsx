
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
  const { fetchCurrentUser, currentUser } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["jwauth"]);

  useEffect(() => {
    if (cookies.jwauth) {
      if (!currentUser) {
        fetchCurrentUser();
      }
    }
  }, [])

  return (
    <>

      <div className='sidebar w-1/6'>
        <div className='sidebar-header'>
          <h1>Chat App</h1>
        </div>
        <div className='sidebar-content'>
          <p>Your friends</p>
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <Header />
        <div className='app'>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
