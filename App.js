import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'; // Import Text
import SentenceComponent from './components/SentenceComponent';
import { GlobalContext, GlobalProvider } from './context/GlobalContext';
import colors from './utils/colors'; // Import colors
import quotes from './utils/quotes';

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    dispatch({ type: 'SET_SENTENCE', sentence: quotes[randomIndex] });
  }, [dispatch]);

  useEffect(() => {
    const leftQuotes = quotes.filter(quote => !state.usedQuotes.includes(quote));
    const randomIndex = Math.floor(Math.random() * leftQuotes.length);
    dispatch({ type: 'SET_SENTENCE', sentence: leftQuotes[randomIndex] });
  }, [state.usedQuotes, dispatch]);

  const onComplete = (sentence) => {
    dispatch({ type: 'SET_USED_QUOTES', quote: sentence });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={colors.primary} />
      <Text style={styles.title}>Letter Quest</Text>
      <SentenceComponent onComplete={onComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background, // Ensure background color is set
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 30,
    color: colors.primary, // Use primary color for the title
  },
});

export default () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
