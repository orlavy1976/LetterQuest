import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';
import quotes from '../utils/quotes';
import SentenceComponent from './SentenceComponent';

const MainScreen = ({ navigation }) => {
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="settings"
          size={25}
          color={colors.onPrimary}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('Settings')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={colors.primary} />
      <Text style={styles.title}>אתגר האותיות</Text>
      <SentenceComponent onComplete={onComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    color: colors.primary,
  },
});

export default MainScreen;
