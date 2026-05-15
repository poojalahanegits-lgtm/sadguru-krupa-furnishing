import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  // LOGIN
  const login = (user, accessToken) => {
    setAuth({
      isAuthenticated: true,
      user,
      accessToken,
    });
  };

  // UPDATE ACCESS TOKEN
  const updateAccessToken = (accessToken) => {
    setAuth((prev) => ({
      ...prev,
      accessToken,
    }));
  };

  // LOGOUT
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        updateAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
