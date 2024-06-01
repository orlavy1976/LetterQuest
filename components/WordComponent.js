import React from 'react';
import { StyleSheet, View } from 'react-native';
import LetterComponent from './LetterComponent';

const WordComponent = ({ word, wordIndex, letterNumberMap, focusedIndex, onCorrect }) => {
  return (
    <View style={styles.wordContainer}>
      {word.split('').map((char, index) => {
        const globalIndex = wordIndex + index;
        return (
          <LetterComponent
            key={globalIndex}
            index={globalIndex}
            number={letterNumberMap[char.toLowerCase()]}
            isFocused={focusedIndex === globalIndex}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wordContainer: {
    flexDirection: 'row-reverse',
    marginHorizontal: 5,
  },
});

export default WordComponent;
