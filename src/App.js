import "./App.css";
import { Routes, Route, useLocation } from 'react-router-dom';
import BoardMedium from "./components/BoardMedium";
import BoardHard from "./components/BoardHard";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import LevelSelection from "./components/LevelSelection";
import { createContext, useEffect, useState } from "react";
import { boardMedium, boardHard, generateWordSet } from "./Words";


export const AppContext = createContext();

const MEDIUM_LEVEL_PATH = '/game/medium';
const HARD_LEVEL_PATH = '/game/hard';
const MEDIUM_WORD_LEN = 6;
const HARD_WORD_LEN = 7;
const MEDIUM_ATTEMPT_MAX = 6;
const HARD_ATTEMPT_MAX = 5;

function App() {
  const location = useLocation();
  const WORD_LEN = location.pathname === MEDIUM_LEVEL_PATH ? MEDIUM_WORD_LEN : HARD_WORD_LEN;
  const ATTEMPT_MAX = location.pathname === MEDIUM_LEVEL_PATH ? MEDIUM_ATTEMPT_MAX : HARD_ATTEMPT_MAX;

  const [board, setBoard] = useState(location.pathname === MEDIUM_LEVEL_PATH ? boardMedium : boardHard);
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
              <Routes>
                <Route path='/' element={<LevelSelection/>} />
                <Route path='/game/medium' element={<><BoardMedium /> {gameOver.gameOver ? <GameOver /> : <Keyboard />} </>}/>
                <Route path='/game/hard' element={<><BoardHard /> {gameOver.gameOver ? <GameOver /> : <Keyboard />} </>}/>
              </Routes>

              {/* <Board /> */}
              {/* {gameOver.gameOver ? <GameOver /> : <Keyboard />} */}
            </div>
          </AppContext.Provider>
        </div>
  );
}

export default App;
