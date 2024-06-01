import React, { createContext, useReducer } from 'react';

const initialState = {
  letters: {},
  usedQuotes: [],
  randomQuote: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LETTER':
      return {
        ...state,
        letters: { ...state.letters, [action.index]: action.letter }
      };
    case 'SET_USED_QUOTES':
      return {
        ...state,
        usedQuotes: [...state.usedQuotes, action.quote]
      };
    case 'SET_RANDOM_QUOTE':
      return {
        ...state,
        randomQuote: action.quote
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};