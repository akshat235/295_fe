import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [isTestStarted, setIsTestStarted] = useState(localStorage.getItem("isTestStarted") === "true"); 

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, isTestStarted, setIsTestStarted }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;