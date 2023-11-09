/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable eol-last */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (token, userId, userName) => {
    setUser({ token, userId, userName });
    localStorage.setItem('token', token);
    localStorage.setItem('IdUsuario', userId);
    localStorage.setItem('NombreUsuario', userName);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('IdUsuario');
    localStorage.removeItem('NombreUsuario');
  };

  // Comprueba si el usuario está autenticado en el almacenamiento local al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('IdUsuario');
    const userName = localStorage.getItem('NombreUsuario');

    if (token) {
      setUser({ token, userId, userName });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};