import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [letters, setLetters] = useState({});

  const submitLetter = (index, letter) => {
    setLetters(prevLetters => ({ ...prevLetters, [index]: letter }));
  };

  return (
    <GlobalContext.Provider value={{ letters, submitLetter }}>
      {children}
    </GlobalContext.Provider>
  );
};