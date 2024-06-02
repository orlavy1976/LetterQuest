import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { I18nManager, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';
import generateRandomNumbers from '../utils/generateRandomNumbers';
import KeyboardComponent from './KeyboardComponent';
import WordComponent from './WordComponent';

I18nManager.forceRTL(true);

const SentenceComponent = ({ onComplete }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [letterNumberMap, setLetterNumberMap] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    console.log('SentenceComponent useEffect', state.sentence);
    setLetterNumberMap(generateRandomNumbers(state.sentence));
    setRandomCorrectLetters();
  }, [state.sentence, state.difficulty]);

  useEffect(() => {
    if (!state.letters) return;
    if (Object.keys(state.letters).length === 0) return;
    checkIfComplete();
  }, [state.letters]);

  const setRandomCorrectLetters = () => {
    const difficultyMap = {
      easy: 0.5,
      medium: 0.35,
      hard: 0.2,
    };
    let numHintsPercentage = difficultyMap[state.difficulty] || 0.3;

    const numHints = Math.ceil(state.sentence.replace(/ /g, '').length * numHintsPercentage); // 20% of the letters
    const indices = Array.from(Array(state.sentence.length).keys()).filter(i => state.sentence[i] !== ' ');
    const shuffledIndices = indices.sort(() => 0.5 - Math.random()).slice(0, numHints);

    shuffledIndices.forEach(index => {
      dispatch({ type: 'SET_LETTER', index, letter: state.sentence[index], correct: true });
    });
  };

  const focusOnNextLetter = (index) => {
    const nextIndex = findNextIndex(index);
    console.log('focusOnNextLetter', index, nextIndex);
    if (nextIndex !== -1) {
      dispatch({ type: 'SET_FOCUSED_INDEX', index: nextIndex });
    }
  };

  const findNextIndex = (currentIndex) => {
    for (let i = currentIndex + 1; i < state.sentence.length; i++) {
      if (state.sentence[i] !== ' ' && !state.letters[i].letter) {
        return i;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      if (state.sentence[i] !== ' ' && !state.letters[i].letter) {
        return i;
      }
    }
    return -1;
  };

  const checkIfComplete = () => {
    const allCorrect = Object.keys(state.letters).every(i => state.letters[i] === ' ' ? true : state.letters[i].correct);
    if (allCorrect) {
      handleSentenceComplete();
    }
  };

  const handleSentenceComplete = () => {
    console.log('handleSentenceComplete');
    setShowSuccess(true);
    animationRef.current?.play();
    setTimeout(() => {
      setShowSuccess(false);
      if (onComplete) onComplete(state.sentence);
    }, 3000);
  };

  const handleKeyPress = (letter) => {
    if (state.focusedIndex !== null) {
      const correct = letter.toLowerCase() === state.sentence[state.focusedIndex].toLowerCase();
      dispatch({ type: 'SET_LETTER', index: state.focusedIndex, letter, correct });
      if (correct) {
        focusOnNextLetter(state.focusedIndex);
      }
    }
  };

  const renderSentence = () => {
    return state.sentence.split(' ').map((word, wordIndex) => (
      <WordComponent
        key={wordIndex}
        word={word}
        wordIndex={state.sentence.indexOf(word)}
        letterNumberMap={letterNumberMap}
        focusedIndex={state.focusedIndex}
      />
    ));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sentenceContainer}>
          {renderSentence()}
        </View>
      </ScrollView>
      <KeyboardComponent onPress={handleKeyPress} />
      {showSuccess && (<LottieView
        ref={animationRef}
        source={require('../assets/success.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />)}
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
    paddingTop: 30,
    paddingBottom: 100,
  },

  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center', // Ensure items are centered
    flexShrink: 1, // Prevent words from breaking between lines
  },
  space: {
    width: 10,
    flexBasis: 10, // Ensure the space only takes the necessary width
    flexShrink: 0, // Prevent the space from shrinking and causing line breaks
  },
  animation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default SentenceComponent;