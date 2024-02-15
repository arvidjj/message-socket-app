import React from "react"
import apiInstance from "../apiInstance"
import jwt from 'jsonwebtoken';

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null)

  const fetchCurrentUser = async () => {
    const payload = jwt.verify(jwt, process.env.JWT_SECRET);

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

export const useCurrentUser = () => React.useContext(CurrentUserContext)