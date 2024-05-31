import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';

const LetterComponent = ({ index, expectedLetter, number }) => {
  const { submitLetter } = useContext(GlobalContext);
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(null); // null, true, false
  const [isFocused, setIsFocused] = useState(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

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

  const handleSubmit = () => {
    if (input.toLowerCase() === expectedLetter.toLowerCase()) {
      setCorrect(true);
      setIsFocused(false);
    } else {
      setCorrect(false);
      Animated.sequence([
        shakeRight(), shakeLeft(), shakeRight(), shakeLeft(), shakeRight(), shakeLeft(),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
    submitLetter(index, input);
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
            onChangeText={(input) => {
              setInput(input);
              handleSubmit();
            }}
            maxLength={1}
            cursorColor="transparent"
            onFocus={() => {
              console.log("setting focus to true", index);
              setIsFocused(true)
            }}
            onBlur={() => {
              setIsFocused(false)
            }}
          />
        }
        <View style={styles.line} />
        <Text style={styles.number}>{number}</Text>
      </View>
    </Animated.View>

  );
};

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