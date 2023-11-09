/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable eol-last */
import React, { createContext, useContext, useState } from 'react';
// Crear un contexto para los datos del usuario
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    direccion: '',
    email: '',
    nombreCompleto: '',
    profesion: '',
    telefono: '',
    rni: '',
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};