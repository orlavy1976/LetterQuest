import React from 'react';
import { StyleSheet, View } from 'react-native';
import LetterComponent from './LetterComponent';

const WordComponent = ({ word, wordIndex, letterNumberMap }) => {
  return (
    <View style={styles.wordContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wordContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 10,
  },

});

export default WordComponent;
