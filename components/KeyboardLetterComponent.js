import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../context/GlobalContext';
import colors from '../utils/colors';

const KeyboardLetterComponent = ({ letter, onPress, occurrences }) => {
  const isUsedUp = occurrences <= 0;
  let isUsed = false;
  const { state: { letters } } = useContext(GlobalContext);
  Object.keys(letters).forEach(key => {
    if (letters[key].letter === letter) {
      isUsed = true;
    }
  });

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    if (!isUsedUp) {
      onPress(letter);
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={isUsedUp ? [styles.key, styles.keyUsedUp] : styles.keyContainer}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isUsedUp}
      >
        <LinearGradient
          colors={[colors.secondaryVariant, colors.surface]}
          style={styles.innerKey}
        >
          <Text style={[styles.letter, isUsed && styles.keyInUse, isUsedUp && styles.letterUsedUp]}>
            {letter.toUpperCase()}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  keyContainer: {
    borderRadius: 12, // Round the corners
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 6,
    shadowColor: colors.onSurface,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    width: 32
  },
  key: {
    marginVertical: 8,
    marginHorizontal: 4,
    // paddingHorizontal: 4,
    borderRadius: 12, // Round the corners
    alignItems: 'center',
    width: 32
  },
  innerKey: {
    padding: 8,
    borderRadius: 12, // Round the corners
    alignItems: 'center',
  },
  keyUsedUp: {
    opacity: 0.5, // Add opacity to indicate the key is used up
  },
  keyInUse: {
    color: colors.letterCorrect, // Change color to indicate the key is in use
    fontWeight: 'bold',
  },
  letter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  letterUsedUp: {
    color: colors.onSecondary, // Change color to indicate the letter is used up
  },
});

export default KeyboardLetterComponent;
