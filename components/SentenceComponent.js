import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import generateRandomNumbers from '../utils/generateRandomNumbers';
import KeyboardComponent from './KeyboardComponent';
import LetterComponent from './LetterComponent';

const SentenceComponent = ({ sentence }) => {
  const [letterNumberMap, setLetterNumberMap] = useState({});
  const [focusedIndex, setFocusedIndex] = useState(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    setLetterNumberMap(generateRandomNumbers(sentence));
  }, [sentence]);

  const focusOnLetter = (index) => {
    const nextIndex = findNextIndex(index);
    if (nextIndex !== -1) {
      setFocusedIndex(nextIndex);
      if (letterRefs.current[nextIndex] && letterRefs.current[nextIndex].focus) {
        letterRefs.current[nextIndex].focus();
      }
    }
  };

  const findNextIndex = (currentIndex) => {
    for (let i = currentIndex + 1; i < sentence.length; i++) {
      if (sentence[i] !== ' ' && !letterRefs.current[i].isCorrect()) {
        return i;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      if (sentence[i] !== ' ' && !letterRefs.current[i].isCorrect()) {
        return i;
      }
    }
    return -1;
  };

  const handleKeyPress = (letter) => {
    if (focusedIndex !== null && letterRefs.current[focusedIndex]) {
      letterRefs.current[focusedIndex].setLetter(letter);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sentenceContainer}>
          {sentence.split('').map((char, index) => {
            if (char === ' ') {
              return <View key={index} style={styles.space} />;
            }
            const lowerChar = char.toLowerCase();
            return (
              <LetterComponent
                ref={el => letterRefs.current[index] = el}
                key={index}
                index={index}
                expectedLetter={char}
                number={letterNumberMap[lowerChar]}
                isFocused={focusedIndex === index}
                onCorrect={() => focusOnLetter(index)}
                onFocus={() => setFocusedIndex(index)}
              />
            );
          })}
        </View>
      </ScrollView>
      <KeyboardComponent onPress={handleKeyPress} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 100,
    paddingBottom: 100,
  },
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  space: {
    width: 10,
    flexBasis: '100%',
  },
});

export default SentenceComponent;