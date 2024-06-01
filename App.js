import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SentenceComponent from './components/SentenceComponent';
import { GlobalProvider } from './context/GlobalContext';

export default function App() {
  return (
    <GlobalProvider>
      <View style={styles.container}>
        <Text>LetterQuest Game</Text>
        <SentenceComponent sentence="hello world and have a nice day" />
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
});