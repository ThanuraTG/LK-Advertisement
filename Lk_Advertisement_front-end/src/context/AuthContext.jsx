import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const user = localStorage.getItem('user');
    
  //   if (token && user) {
  //     setCurrentUser(JSON.parse(user));
  //   }
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          const response = await authAPI.getUserById(parsedUser.id);
          setCurrentUser(response.data);
        } catch (error) {
          console.error('Error fetching user from backend:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);



  // const login = async (credentials) => {
  //   try {
  //     const response = await authAPI.login(credentials);
  //     const { token, id } = response.data;

  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify({ id }));

  //     // get full user details from backend using id
  //     const userResponse = await authAPI.getUserById(id);
  //     setCurrentUser(userResponse.data);

  //     return { success: true, data: userResponse.data };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.response?.data?.message || 'Login failed',
  //     };
  //   }
  // };


  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };


  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

