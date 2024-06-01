import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  sentence: '',
  letters: {},
  focusedIndex: null,
  usedQuotes: [],
  letterOccurrences: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SENTENCE':
      const letterOccurrences = {};
      action.sentence.split('').forEach(letter => {
        if (letter !== ' ') {
          letterOccurrences[letter.toLowerCase()] = (letterOccurrences[letter.toLowerCase()] || 0) + 1;
        }
      });
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
        letterOccurrences
      };
    case 'SET_LETTER':
      console.log('SET_LETTER', action);
      const updatedOccurrences = { ...state.letterOccurrences };
      if (action.correct) {
        updatedOccurrences[action.letter.toLowerCase()]--;
      }
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
        letterOccurrences: updatedOccurrences,
      };
    case 'SET_FOCUSED_INDEX':
      return {
        ...state,
        focusedIndex: action.index,
      };
    case 'SET_USED_QUOTES':
      const updatedUsedQuotes = [...state.usedQuotes, action.quote];
      AsyncStorage.setItem('usedQuotes', JSON.stringify(updatedUsedQuotes)); // Save to AsyncStorage

      return {
        ...state,
        usedQuotes: updatedUsedQuotes,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadUsedQuotes = async () => {
      try {
        const storedUsedQuotes = await AsyncStorage.getItem('usedQuotes');
        console.log('storedUsedQuotes', storedUsedQuotes);
        if (storedUsedQuotes) {
          dispatch({ type: 'INITIALIZE_USED_QUOTES', usedQuotes: JSON.parse(storedUsedQuotes) });
        }
      } catch (error) {
        console.error('Failed to load used quotes from storage', error);
      }
    };
    loadUsedQuotes();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};