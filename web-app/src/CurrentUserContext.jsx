
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiInstance from "../apiInstance"

 const CurrentUserContext = createContext()

export const useAuth = () => {
  return useContext(CurrentUserContext);
}

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null)

  const fetchCurrentUser = async () => {

    let response = await apiInstance.get("/users")
    response = await response.json()
    setCurrentUser(response)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
