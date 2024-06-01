import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LetterComponent from './LetterComponent';

const SentenceComponent = ({ sentence }) => {
  const [letterNumberMap, setLetterNumberMap] = useState({});
  const [filledLetters, setFilledLetters] = useState([]);
  const letterRefs = useRef([]);

  useEffect(() => {
    const generateRandomNumbers = () => {
      const map = {};
      const usedNumbers = new Set();

      sentence.split('').forEach(char => {
        const lowerChar = char.toLowerCase();
        if (char !== ' ' && !map[lowerChar]) {
          let randomNumber;
          do {
            randomNumber = Math.floor(Math.random() * 50) + 1;
          } while (usedNumbers.has(randomNumber)); // Ensure unique numbers
          map[lowerChar] = randomNumber;
          usedNumbers.add(randomNumber);
        }
      });

      setLetterNumberMap(map);
    };

    generateRandomNumbers();
  }, [sentence]);

  const handleCorrect = (index) => {
    console.log("handling correct", index, filledLetters);
    setFilledLetters(prev => [...prev, index]);
    let nextLetterIndex = index + 1;
    while ((filledLetters.includes(nextLetterIndex) || !letterRefs.current[nextLetterIndex]) && nextLetterIndex < sentence.length) {
      nextLetterIndex++;
    }
    if (nextLetterIndex >= sentence.length) {
      // check if there are letters left
      for (let i = 0; i < sentence.length; i++) {
        if (!filledLetters.includes(i)) {
          console.log("found previous letter", i);
          letterRefs.current[i].focus();
          return;
        }
      }
    }
    console.log("nextLetterIndex", nextLetterIndex);
    if (letterRefs.current[nextLetterIndex]) {
      letterRefs.current[nextLetterIndex].focus();
    }
  }



  return (
    <View style={styles.sentenceContainer}>
      {sentence.split('').map((char, index) => {
        if (char === ' ') {
          return <View key={index} style={styles.space} />;
        }
        return (
          <LetterComponent
            ref={el => letterRefs.current[index] = el}
            key={index}
            index={index}
            expectedLetter={char}
            number={letterNumberMap[char.toLowerCase()]}
            onCorrect={(index) => handleCorrect(index)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  sentenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  space: {
    width: 20, // Adjust space width as needed
  },
});

export default SentenceComponent;