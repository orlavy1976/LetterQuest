import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import KeyboardLetterComponent from './KeyboardLetterComponent';

const letters = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const KeyboardComponent = ({ onPress }) => {
  return (
    <View style={styles.keyboard}>
      {letters.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(letter => (
            <KeyboardLetterComponent key={letter} letter={letter} onPress={onPress} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    padding: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.onSurface,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default KeyboardComponent;