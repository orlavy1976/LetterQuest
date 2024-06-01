import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import KeyboardLetterComponent from './KeyboardLetterComponent';

const letters = [
  ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ']
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