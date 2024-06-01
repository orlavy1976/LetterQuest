import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

const KeyboardLetterComponent = ({ letter, onPress, occurrences }) => {
  const isUsedUp = occurrences <= 0;

  return (
    <TouchableOpacity
      style={[styles.key, isUsedUp && styles.keyUsedUp]}
      onPress={() => !isUsedUp && onPress(letter)}
      disabled={isUsedUp}
    >
      <Text style={[styles.letter, isUsedUp && styles.letterUsedUp]}>{letter.toUpperCase()}</Text>
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
  keyUsedUp: {
    backgroundColor: colors.surface, // Change to indicate the key is used up
    opacity: 0.3, // Add opacity to indicate the key is used up
  },
  letter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  letterUsedUp: {
    color: colors.onSurface, // Change color to indicate the letter is used up
  },
});

export default KeyboardLetterComponent;
