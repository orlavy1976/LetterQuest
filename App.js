import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SentenceComponent from './components/SentenceComponent';
import { GlobalProvider } from './context/GlobalContext';
import colors from './utils/colors';
import quotes from './utils/quotes'; // Import the quotes array

export default function App() {
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    // Select a random quote when the app starts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Text style={styles.title}>LetterQuest Game</Text>
        <SentenceComponent sentence={randomQuote} />
        <StatusBar style="auto" />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});