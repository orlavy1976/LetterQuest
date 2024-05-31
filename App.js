import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LetterComponent from './components/LetterComponent';
import { GlobalProvider } from './context/GlobalContext';



export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Text>LetterQuest Game</Text>
        <View style={styles.letterContainer}>
          <LetterComponent index={0} expectedLetter="e" number={1} />
          <LetterComponent index={1} expectedLetter="o" number={2} />
        </View>
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
  letterContainer: {
    flexDirection: 'row',
  },
});