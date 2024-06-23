import { Picker } from '@react-native-picker/picker';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';

const SettingsScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleDifficultyChange = (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty });
    dispatch({ type: 'SET_SENTENCE', sentence: state.sentence });
  };

  const handleResetQuote = (quote) => {
    dispatch({ type: 'SET_SENTENCE', sentence: quote });
    navigation.navigate('Home');
  };

  const renderQuoteItem = ({ item }) => (
    <View style={styles.quoteItem}>
      <Text style={styles.quoteText} numberOfLines={1}>{item}</Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => handleResetQuote(item)}
      >
        <Text style={styles.resetButtonText}>פתור שוב</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>הגדרות</Text>

      <Text style={styles.label}>רמת קושי:</Text>
      <Picker
        selectedValue={state.difficulty}
        style={styles.picker}
        onValueChange={(itemValue) => handleDifficultyChange(itemValue)}
      >
        <Picker.Item label="קל" value="easy" />
        <Picker.Item label="בינוני" value="medium" />
        <Picker.Item label="קשה" value="hard" />
      </Picker>

      <Text style={styles.statsTitle}>נתונים</Text>
      <Text style={styles.stats}>אתגרים שנפתרו: {state.usedQuotes.length}</Text>

      <Text style={styles.solvedQuotesTitle}>ציטוטים שנפתרו:</Text>
      <FlatList
        data={state.usedQuotes}
        renderItem={renderQuoteItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.quoteList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.onBackground,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 20,
    color: colors.onBackground,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: colors.primary,
  },
  stats: {
    fontSize: 18,
    color: colors.onBackground,
  },
  quoteList: {
    flex: 1,
  },
  quoteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.onSurface,
  },
  quoteText: {
    flex: 1,
    fontSize: 16,
    color: colors.onBackground,
  },
  resetButton: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
  },
  resetButtonText: {
    color: colors.onPrimary,
    fontSize: 14,
  },
  solvedQuotesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: colors.primary,
  },
});

export default SettingsScreen;
