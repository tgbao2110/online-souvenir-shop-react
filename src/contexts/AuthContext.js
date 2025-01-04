// src/contexts/AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    // Get the initial role from local storage if available, or default to "guest"
    const storedRole = localStorage.getItem("userRole");
    return storedRole ? storedRole : "guest";
  });

  useEffect(() => {
    // Whenever the role changes, update it in local storage
    localStorage.setItem("userRole", role);
  }, [role]);

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
