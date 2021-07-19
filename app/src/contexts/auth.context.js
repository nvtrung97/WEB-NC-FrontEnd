import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storedDataUser = localStorage.getItem(global.config.LOCALSTORAGE_NAME);
    if (storedDataUser) {
      setUser(JSON.parse(storedDataUser));
      
      api.defaults.headers.Authorization = user.accessToken;
      console.log(storedDataUser);
    }
  }, [user.accessToken]);
  function signOut() {
    setUser({});
    localStorage.removeItem(global.config.LOCALSTORAGE_NAME);
  }
  async function signIn(entity) {
    const response = await api.post('/auth/signin', entity);
    setUser(response.data);
    api.defaults.headers.Authorization = response.data.accessToken;
    localStorage.setItem(
      global.config.LOCALSTORAGE_NAME,
      JSON.stringify(response.data)
    );
    return response;
  }
  async function signUp(entity) {
    const response = await api.post('/auth/signup', entity);
    return response;
  }
  async function getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response;
  }
  async function otp(token_otp, entity) {
    api.defaults.headers.Authorization = `Bearer ${token_otp}`;
    const response = await api.post('/auth/otp', entity);
    return response;
  }
  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(user),
        user,
        signIn,
        signUp,
        otp,
        signOut,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export default AuthContext;
