import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';

const LetterComponent = forwardRef(({ index, number, isFocused }, ref) => {
  const { state, dispatch } = useContext(GlobalContext);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const { correct, letter } = state.letters[index];

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

  useImperativeHandle(ref, () => ({
    focus: () => {
      dispatch({ type: 'SET_FOCUSED_INDEX', index });
    },
    blur: () => {
      dispatch({ type: 'SET_FOCUSED_INDEX', index: null });
    },
  }));

  const showIncorrectAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }

  console.log('LetterComponent render', index, state.letters[index]);

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
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: colors.surface,
    borderRadius: 5,
    elevation: 2,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  focusedContainer: {
    backgroundColor: colors.letterFocused,
  },
  input: {
    height: 25,
    width: 25,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 25,
  },
  correctInput: {
    color: colors.letterCorrect,
  },
  incorrectInput: {
    color: colors.letterIncorrect,
  },
  line: {
    height: 2,
    width: 25,
    backgroundColor: colors.onSurface,
    marginVertical: 5,
  },
  number: {
    fontSize: 16,
    color: colors.onSurface,
  },
});

export default LetterComponent;