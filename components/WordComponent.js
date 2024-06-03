import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../utils/colors';
import LetterComponent from './LetterComponent';

const WordComponent = ({ word, wordIndex, letterNumberMap }) => {
  return (
    <LinearGradient
      colors={[colors.secondaryVariant, colors.surface]}
      style={styles.wordContainer}
    >
      {word.split('').map((char, index) => {
        const globalIndex = wordIndex + index;
        return (
          <LetterComponent
            key={globalIndex}
            index={globalIndex}
            number={letterNumberMap[char.toLowerCase()]}
          />
        );
      })}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wordContainer: {
    backgroundColor: '#FFE4C4', // A warm, light beige
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default WordComponent;
