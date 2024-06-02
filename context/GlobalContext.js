import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer } from 'react';

const initialState = {
  sentence: '',
  letters: {},
  focusedIndex: null,
  usedQuotes: [],
  letterOccurrences: {},
  difficulty: 'easy',
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
      console.log('SET_FOCUSED_INDEX', action.index);
      return {
        ...state,
        focusedIndex: action.index,
      };
    case 'SET_USED_QUOTES':
      return {
        ...state,
        usedQuotes: [...state.usedQuotes, action.quote],
      };
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.difficulty,
      };
    case 'INITIALIZE_STATE':
      return {
        ...state,
        ...action.state,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('appState');
        if (storedState) {
          dispatch({ type: 'INITIALIZE_STATE', state: JSON.parse(storedState) });
        }
      } catch (error) {
        console.error('Failed to load state from storage', error);
      }
    };
    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('appState', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save state to storage', error);
      }
    };
    saveState();
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
