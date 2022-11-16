import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./Words";

export const AppContext = createContext();

function App() {
  const wordLen = 6;
  const attemptMax = 6;

  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessWord: false,
  })

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > wordLen-1) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    // if (currAttempt.letterPos !== wordLen) return;

    if (currAttempt.letterPos !== wordLen) {
      alert("Please submit a " + wordLen + " letter word");
    } else {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    }

    let currWord = "";
    for (let i = 0; i < wordLen; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    // if (wordSet.has(currWord.toLowerCase())) {
    //   setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    // } else {
    //   alert("Word Not Found");
    // }

    if (currWord == correctWord) {      
      setGameOver({gameOver: true, guessWord: true});
      return;
    }

    if (currAttempt.attempt === attemptMax) {
      setGameOver({gameOver: true, guessWord: false});
    }
  };
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> :  <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
