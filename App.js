import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SentenceComponent from './components/SentenceComponent';
import { GlobalProvider } from './context/GlobalContext';
import quotes from './utils/quotes';

function App() {
  const [randomQuote, setRandomQuote] = useState('');
  const [usedQuotes, setUsedQuotes] = useState([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  useEffect(() => {
    const leftQuotes = quotes.filter(quote => !usedQuotes.includes(quote));
    const randomIndex = Math.floor(Math.random() * leftQuotes.length);
    setRandomQuote(leftQuotes[randomIndex]);
  }, [usedQuotes]);

  onComplete = (sentence) => {
    setUsedQuotes([...usedQuotes, sentence]);
  }

  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Text style={styles.title}>LetterQuest Game</Text>
        <SentenceComponent sentence={randomQuote} onComplete={onComplete} />
        <StatusBar style="auto" />
      </View>
    </GlobalProvider>
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

export default App;