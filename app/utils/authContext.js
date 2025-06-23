import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, saveToken } from './authStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    (async () => {
      const storedToken = await getToken();
      setToken(storedToken);
    })();
  }, []);

  const login = async (newToken) => {
    await saveToken(newToken);
    setToken(newToken);
    router.replace('/(main)/home'); 
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    // router.replace('/(auth)/login'); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
