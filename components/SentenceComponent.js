import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { I18nManager, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import generateRandomNumbers from '../utils/generateRandomNumbers';
import KeyboardComponent from './KeyboardComponent';
import LetterComponent from './LetterComponent';
I18nManager.forceRTL(true);

const SentenceComponent = ({ sentence, onComplete }) => {
  const [letterNumberMap, setLetterNumberMap] = useState({});
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const letterRefs = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    setLetterNumberMap(generateRandomNumbers(sentence));
    setRandomCorrectLetters();
    letterRefs.current.forEach(ref => {
      if (ref) ref.blur();
    });
    setFocusedIndex(null);
  }, [sentence]);

  const setRandomCorrectLetters = () => {
    const numHints = Math.ceil(sentence.replace(/ /g, '').length * 0.2); // 20% of the letters
    const indices = Array.from(Array(sentence.length).keys()).filter(i => sentence[i] !== ' ');
    const shuffledIndices = indices.sort(() => 0.5 - Math.random()).slice(0, numHints);

    shuffledIndices.forEach(index => {
      if (letterRefs.current[index]) {
        letterRefs.current[index].setInitialLetter(sentence[index]);
      }
    });
  };

  const focusOnNextLetter = (index) => {
    console.log('focusOnNextLetter', index);
    const nextIndex = findNextIndex(index);
    console.log('nextIndex', nextIndex);
    if (nextIndex !== -1) {
      setFocusedIndex(nextIndex);
      if (letterRefs.current[nextIndex] && letterRefs.current[nextIndex].focus) {
        letterRefs.current[nextIndex].focus();
      }
    }
    checkIfComplete(index);
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

  const checkIfComplete = (index) => {
    console.log('checkIfComplete');
    const lettersToCheck = letterRefs.current.filter((_, i) => index !== i);
    lettersToCheck.forEach((ref, index) => {
      console.log('ref', index, ref?.isCorrect());
    });
    if (lettersToCheck.every(ref => ref && ref.isCorrect())) {
      handleSentenceComplete();
    }
  };

  const handleSentenceComplete = () => {
    setShowSuccess(true);
    animationRef.current?.play();
    setTimeout(() => {
      setShowSuccess(false);
      if (onComplete) onComplete(sentence);
    }, 3000);
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
                onCorrect={() => focusOnNextLetter(index)}
                onFocus={() => setFocusedIndex(index)}
              />
            );
          })}
        </View>
      </ScrollView>
      <KeyboardComponent onPress={handleKeyPress} />
      {showSuccess && (
        <LottieView
          ref={animationRef}
          source={require('../assets/success.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
      )}
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
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  space: {
    width: 10,
    flexBasis: '100%',
  },
  animation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default SentenceComponent;