import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

const KeyboardLetterComponent = ({ letter, onPress }) => {
  return (
    <TouchableOpacity style={styles.key} onPress={() => onPress(letter)}>
      <Text style={styles.letter}>{letter.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  key: {
    backgroundColor: colors.surface,
    padding: 10,
    margin: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  letter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
});

export default KeyboardLetterComponent;