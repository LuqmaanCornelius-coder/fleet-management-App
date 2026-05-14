import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAuthToken } from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('fleetUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('fleetToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user: currentUser } = response.data;
    localStorage.setItem('fleetToken', token);
    localStorage.setItem('fleetUser', JSON.stringify(currentUser));
    setAuthToken(token);
    setUser(currentUser);
    return currentUser;
  };

  const logout = () => {
    localStorage.removeItem('fleetToken');
    localStorage.removeItem('fleetUser');
    setAuthToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
