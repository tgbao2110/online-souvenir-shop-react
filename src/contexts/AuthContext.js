// src/contexts/AuthContext.js
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [role, setRole] = useState("guest");

  const login = (userRole) => {
    setRole(userRole);
  };

  const logout = () => {
    setRole("guest");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
