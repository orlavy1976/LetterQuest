import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SentenceComponent from './components/SentenceComponent';
import { GlobalContext, GlobalProvider } from './context/GlobalContext';
import quotes from './utils/quotes';

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatch({ type: 'SET_RANDOM_QUOTE', quote: quotes[randomIndex] });
  }, [dispatch]);

  useEffect(() => {
    const leftQuotes = quotes.filter(quote => !state.usedQuotes.includes(quote));
    const randomIndex = Math.floor(Math.random() * leftQuotes.length);
    dispatch({ type: 'SET_RANDOM_QUOTE', quote: leftQuotes[randomIndex] });
  }, [state.usedQuotes, dispatch]);

  const onComplete = (sentence) => {
    dispatch({ type: 'SET_USED_QUOTES', quote: sentence });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LetterQuest Game</Text>
      <SentenceComponent sentence={state.randomQuote} onComplete={onComplete} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);