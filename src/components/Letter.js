import React, { useContext, useEffect } from 'react';
import { AppContext } from "../App";


function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;


  let letterInCorrectCount = (correctWord.match(letter) || []).length;
  // let letterInAttemptCount = (correctWord.substring(0, letterPos + 1).match(letter) || []).length;
  let letterInAttemptCount = 0;

  for (let i = 0; i <= letterPos; i++) {
    if (letter === board[attemptVal][i]) {
      letterInAttemptCount++;
    }
  }

  // console.log("count compare: " + letterInAttemptCount + " " + letterInCorrectCount);
  const almost = !correct
    && letter !== ""
    && correctWord.includes(letter)
    && letterInAttemptCount <= letterInCorrectCount;

  const letterState = currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <div className='letter' id={letterState}>{letter}</div>
  )
}

export default Letter