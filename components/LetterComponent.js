import React, { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';

const LetterComponent = ({ index, number }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { correct, letter } = state.letters[index];
  const isFocused = state.focusedIndex === index;
  useEffect(() => {
    let timer;
    if (correct === false) {
      showIncorrectAnimation();
      timer = setTimeout(() => {
        dispatch({ type: 'SET_LETTER', index, letter: '', correct: null });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [correct]);

  const showIncorrectAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isFocused) {
          dispatch({ type: 'SET_FOCUSED_INDEX', index });
        }
      }}
      style={[
        styles.container,
        isFocused && styles.focusedContainer,
        { transform: [{ translateX: shakeAnimation }] }
      ]}
    >
      <Text style={[
        styles.input,
        correct === true && styles.correctInput,
        correct === false && styles.incorrectInput
      ]}>{letter}</Text>
      <View style={styles.line} />
      <Text style={styles.number}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 0,
    padding: 10,
  },
  focusedContainer: {
    backgroundColor: colors.letterFocused
  },
  input: {
    height: 20,
    width: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  correctInput: {
    color: colors.letterCorrect,
  },
  incorrectInput: {
    color: colors.letterIncorrect,
  },
  line: {
    height: 2,
    width: 20,
    backgroundColor: colors.onSurface,
    marginVertical: 5,
  },
  number: {
    fontSize: 16,
    color: colors.onSurface,
  },
});


export default LetterComponent;