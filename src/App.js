import "./App.css";
import { Routes, Route, Link } from 'react-router-dom';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import LevelSelection from "./components/LevelSelection";
import { createContext, useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./Words";


export const AppContext = createContext();

function App() {
  const WORD_LEN = 6;
  const ATTEMPT_MAX = 6;

  // const LEVEL_NORMAL = "normal";
  // const LEVEL_HARD = "hard";

  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessWord: false,
  })
  // const [level, setLevel] = useState(LEVEL_NORMAL);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > WORD_LEN - 1) return;
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

    if (currAttempt.letterPos !== WORD_LEN) {
      alert("Please submit a " + WORD_LEN + " letter word");
    } else {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    }

    let currWord = "";
    for (let i = 0; i < WORD_LEN; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    // if (wordSet.has(currWord.toLowerCase())) {
    //   setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    // } else {
    //   alert("Word Not Found");
    // }

    if (currWord == correctWord) {
      setGameOver({ gameOver: true, guessWord: true });
      return;
    }

    if (currAttempt.attempt === ATTEMPT_MAX) {
      setGameOver({ gameOver: true, guessWord: false });
    }
  };
  return (
        <div className="App">
            <nav>
              <h1>Wordle</h1>
            </nav>

          {/* <Route path='/' element={<Board />}/> */}

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
              {gameOver.gameOver ? <GameOver /> : <Keyboard />}
            </div>
          </AppContext.Provider>
        </div>
  );
}

export default App;
