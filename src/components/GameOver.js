import React, {useContext} from 'react';
import { AppContext } from "../App";

function GameOver() {
    const { gameOver, currAttempt, correctWord } = useContext(AppContext);
  return (
    <div className='gameOver'>
        <h3>{gameOver.guessWord ? "Congratulations!  Would you like to try again?" : "You failed"}</h3>
        <h1>Correct: {correctWord}</h1>
        {gameOver.guessWord && (
            <h3>You guessed in {currAttempt.attempt} attempts</h3>
        )}
        <button onClick={refreshPage}>Start again!</button>
    </div>
  )
}

function refreshPage() {
    window.location.reload();
}

export default GameOver