import React, { createContext, useReducer } from 'react';

const initialState = {
  sentence: '',
  letters: {},
  focusedIndex: null,
  usedQuotes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SENTENCE':
      return {
        ...state,
        sentence: action.sentence,
        letters: Array.from({ length: action.sentence.length }).reduce((acc, _, index) => {
          acc[index] = {
            letter: action.sentence[index] === ' ' ? ' ' : '',
            correct: action.sentence[index] === ' ' ? true : null,
          };
          return acc;
        }, {}),
        focusedIndex: null,
      };
    case 'SET_LETTER':
      console.log('SET_LETTER', action);
      return {
        ...state,
        letters: {
          ...state.letters,
          [action.index]: {
            ...state.letters[action.index],
            correct: action.correct,
            letter: action.letter
          }
        },
      };
    case 'SET_FOCUSED_INDEX':
      return {
        ...state,
        focusedIndex: action.index,
      };
    case 'SET_USED_QUOTES':
      return {
        ...state,
        usedQuotes: [...state.usedQuotes, action.quote],
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