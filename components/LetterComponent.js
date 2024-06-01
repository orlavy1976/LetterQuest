import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';

const LetterComponent = forwardRef(({ index, expectedLetter, number, isFocused, onCorrect, onFocus }, ref) => {
  const { dispatch } = useContext(GlobalContext);
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(null); // null, true, false
  const [isComponentFocused, setIsComponentFocused] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer;
    if (correct === false) {
      timer = setTimeout(() => {
        setInput('');
        setCorrect(null);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [correct]);

  useEffect(() => {
    if (isFocused) {
      setIsComponentFocused(true);
    } else {
      setIsComponentFocused(false);
    }
  }, [isFocused]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      setIsComponentFocused(true);
    },
    blur: () => {
      setIsComponentFocused(false);
    },
    isFocused: () => isComponentFocused,
    setLetter: (letter) => handleLetterInput(letter),
    setInitialLetter: (letter) => {
      setInput(letter);
      setCorrect(true);
    },
    isCorrect: () => correct === true,
  }));

  const handleLetterInput = (letter) => {
    if (letter.toLowerCase() === expectedLetter.toLowerCase()) {
      setInput(letter);
      setCorrect(true);
      setIsComponentFocused(false);
      if (onCorrect) onCorrect(index);
    } else {
      setInput(letter);
      setCorrect(false);
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
    dispatch({ type: 'SET_LETTER', index, letter });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (!isComponentFocused) {
          setIsComponentFocused(true);
          if (onFocus) onFocus(index);
        }
      }}
      style={[
        styles.container,
        isComponentFocused && styles.focusedContainer,
        { transform: [{ translateX: shakeAnimation }] }
      ]}
    >
      <Text style={[
        styles.input,
        correct === true && styles.correctInput,
        correct === false && styles.incorrectInput
      ]}>{input}</Text>
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