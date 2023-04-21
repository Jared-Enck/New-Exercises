function guessingGame() {
  const target = Math.floor(Math.random() * 100);
  let count = 0;
  let gameWon = false;
  
  return function checkGuess(num) {
    count ++;
    if (num === target) {
      if(!gameWon) {
        gameWon = true
        return `You win! You found ${target} in ${count} guesses.`;
      } else {
        return 'The game is over, you already won!';
      }
    } 
    return num > target
      ? `${num} is too high!` 
      : `${num} is too low!`;
  }
}

module.exports = { guessingGame };
