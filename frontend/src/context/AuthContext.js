import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserToken } from '../utils/user';
import getFromLocalStorage from '../utils/getFromLocalStorage';

const initialUser = { hasToken: false, user: {} };

const AuthContext = createContext(initialUser);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialUser);

  const getUserTokenQuery = useQuery({
    queryKey: ['getUserToken'],
    queryFn: getUserToken,
  });

  const getUserFromLocalStorage = () => {
    const user = getFromLocalStorage('user') || {};

    setUser(user);
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    const data = getUserTokenQuery?.data;
    if (data?.status === 'ok') {
      getUserFromLocalStorage();

      setAuth((state) => ({
        ...state,
        hasToken: data?.hasToken,
      }));
    }
  }, [getUserTokenQuery?.data]);

  const setUser = (user) => {
    setAuth((state) => ({
      ...state,
      user,
    }));
  };

  const handleSuccessLogin = (navigate) => (data) => {
    if (data?.status === 'ok') {
      setAuth((state) => ({
        ...state,
        user: data?.user,
        hasToken: data?.hasToken,
      }));
      localStorage.setItem('user', JSON.stringify(data?.user));
      navigate('/profile');
    }
  };

  const resetAuth = () => setAuth(initialUser);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        resetAuth,
        setUser,
        handleSuccessLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
