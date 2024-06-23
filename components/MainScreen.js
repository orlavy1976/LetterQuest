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
    if (!state.sentence) {
      selectNewSentence();
    }
  }, [state.usedQuotes, dispatch]);

  const selectNewSentence = () => {
    const availableQuotes = quotes.filter(quote => !state.usedQuotes.includes(quote));
    if (availableQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      dispatch({ type: 'SET_SENTENCE', sentence: availableQuotes[randomIndex] });
    } else {
      console.log("All quotes have been solved!");
    }
  };

  const onComplete = (sentence) => {
    if (!state.usedQuotes.includes(sentence)) {
      dispatch({ type: 'SET_USED_QUOTES', quote: sentence });
    }
    selectNewSentence();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.statusbarActions}>

          <Icon
            name="refresh"
            size={25}
            color={colors.onPrimary}
            style={{ marginRight: 15 }}
            onPress={() => selectNewSentence()}
          />
          <Icon
            name="settings"
            size={25}
            color={colors.onPrimary}
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
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
  statusbarActions: {
    flexDirection: 'row',
  },
  title: {
    zIndex: 10,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    color: colors.primary,
  },
});

export default MainScreen;
