import React, { useContext, useEffect } from 'react';
import { AppContext } from "../App";


function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord[letterPos] === letter;

  let letterInCorrectCount = (correctWord.match(letter) || []).length; 
  
  for (let i = 0; i <= correctWord.length; i++) {
    if (letter === board[attemptVal][i] && letter === correctWord.charAt(i)) {
      --letterInCorrectCount;
    }
  }

  let letterInAttemptCount = 0;

  for (let i = 0; i <= letterPos; i++) {
    if (letter === board[attemptVal][i]) {
      letterInAttemptCount++;
    }
  }
  
  const almost = !correct
    && letter !== ""
    && correctWord.includes(letter)
    && letterInAttemptCount <= letterInCorrectCount;

  const letterState = currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correctWord.includes(letter)) {      
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter