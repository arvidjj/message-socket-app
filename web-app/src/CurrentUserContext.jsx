
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiInstance from "../apiInstance"
import { useCookies } from "react-cookie";

 const CurrentUserContext = createContext()

export const useAuth = () => {
  return useContext(CurrentUserContext);
}

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(["jwauth"]);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiInstance.get('/users/me');
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  const login = async(email, password) => {
    try {
      const response = await apiInstance.post('/login', { email, password });
      console.log(response);
      setCookie("jwauth", response.data.token, {path:'/'});
      fetchCurrentUser();

    } catch (error) {
      console.error(error);
    }
  }


  const logout = () => {
    // Clear local storage
    removeCookie("jwauth", {path:'/'});
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser, logout, login }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
