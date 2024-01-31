import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
