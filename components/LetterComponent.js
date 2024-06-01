import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';

const LetterComponent = forwardRef(({ index, expectedLetter, number, onCorrect }, ref) => {
  const { submitLetter } = useContext(GlobalContext);
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(null); // null, true, false
  const [isFocused, setIsFocused] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const preventBlur = useRef(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    let timer;
    if (correct === false) {
      timer = setTimeout(() => {
        setCorrect(null);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [correct]);

  const shakeRight = (value) => {
    return Animated.timing(shakeAnimation, { toValue: 1, duration: 50, useNativeDriver: true })
  }

  const shakeLeft = (value) => {
    return Animated.timing(shakeAnimation, { toValue: -1, duration: 50, useNativeDriver: true })
  }

  useEffect(() => {
    if (isFocused) {
      setCorrect(null);
    }
  }, [isFocused]);

  useEffect(() => {
    handleSubmit();
  }, [input]);

  const handleSubmit = () => {
    if (!input) { return; }
    console.log("submitting letter", index, input);
    if (input.toLowerCase() === expectedLetter.toLowerCase()) {
      setCorrect(true);
      setIsFocused(false);
      onCorrect(index);
    } else {
      setCorrect(false);
      Animated.sequence([
        shakeRight(), shakeLeft(), shakeRight(), shakeLeft(), shakeRight(), shakeLeft(),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
    submitLetter(index, input);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (!inputRef.current) { return; }
      preventBlur.current = true;
      console.log('focus', index);
      inputRef.current.focus();
      setTimeout(() => {
        console.log('forcing focus', index);
        inputRef.current.focus(); // Force the keyboard to open
      }, 200); // Add a slight delay to ensure the input is focused
    }
  }));

  const handleBlur = () => {
    console.log('handleBlur', { preventBlur: preventBlur.current });
    if (preventBlur.current) {
      preventBlur.current = false;
      return;
    }
    setIsFocused(false);
  };

  return (
    <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
      <View style={[styles.container, isFocused && styles.focusedContainer]}>
        {correct ?
          <Text style={styles.input}>{input}</Text>
          : <TextInput
            ref={inputRef}
            style={[styles.input, correct === false && styles.incorrectInput]}
            value={correct ? input : ''}
            onChangeText={setInput}
            maxLength={1}
            cursorColor="transparent"
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
          />
        }
        <View style={styles.line} />
        <Text style={styles.number}>{number}</Text>
      </View>
    </Animated.View>

  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 2,
  },
  focusedContainer: {
    backgroundColor: 'rgba(144, 238, 144, 0.3)', // Light green background
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: 30,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
  },
  line: {
    height: 2,
    width: 30,
    backgroundColor: 'black',
    marginVertical: 5,
  },
  number: {
    fontSize: 18,
    color: 'gray',
  },
  incorrectInput: {
    borderColor: 'red',
  },
});

export default LetterComponent;