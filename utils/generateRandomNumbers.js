const generateRandomNumbers = (sentence) => {
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

  return map;
};

export default generateRandomNumbers;