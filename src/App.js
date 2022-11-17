import "./App.css";
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import BoardMedium from "./components/BoardMedium";
import BoardHard from "./components/BoardHard";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import LevelSelection from "./components/LevelSelection";
import Rules from "./components/Rules";
import Notice from "./components/Notice";
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

  const [path, setPath] = useState(location.pathname);
  const [board, setBoard] = useState(path === HARD_LEVEL_PATH ? boardHard : boardMedium );
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessWord: false,
  })
  const [notice, setNotice] = useState({
    wordTooShort: false,
    wordInvalid: false
  });
  const [wordLen, setWordLen] = useState(0);
  
  
  // let wordLen = path === HARD_LEVEL_PATH ? HARD_WORD_LEN : MEDIUM_WORD_LEN;  
  let attemptMax = location.pathname === HARD_LEVEL_PATH ? HARD_ATTEMPT_MAX : MEDIUM_ATTEMPT_MAX;
  
  // let mediumWordSet = new Set();
  // let hardWordSet = new Set();
  // let correctSixWord = "";
  // let correctSevenWord = "";

  // console.log(wordLen);

  useEffect(() => {
    generateWordSet().then((words) => {
        setPath(location.pathname);
        console.log(location.pathname);
        setWordLen(location.pathname === HARD_LEVEL_PATH ? HARD_WORD_LEN : MEDIUM_WORD_LEN);
        setWordSet(location.pathname == HARD_LEVEL_PATH ? words.wordSetHard : words.wordSetMedium );
        setCorrectWord(location.pathname == HARD_LEVEL_PATH ? words.todaysWordHard : words.todaysWordMedium);
        
        // mediumWordSet = words.wordSetMedium;
        // hardWordSet = words.wordSetHard;
        // correctSixWord = words.todaysWordMedium;
        // correctSevenWord = words.todaysWordHard;
  
        // console.log(words.todaysWordMedium);

        // console.log(location.pathname == HARD_LEVEL_PATH);
        // console.log(words);
        console.log(wordLen);
        console.log(correctWord);
        console.log(attemptMax);
        
    });
  }, [wordLen, location.pathname]);

  const onSelectLetter = (keyVal) => {
    // if (currAttempt.attempt === 0 && currAttempt.letterPos === 0) {
    //   setPath(location.pathname);  
    //   setWordSet(path === MEDIUM_LEVEL_PATH ? mediumWordSet : hardWordSet);
    //   setCorrectWord(path === MEDIUM_LEVEL_PATH ? correctSixWord : correctSevenWord);
    // }
    // console.log(correctWord);

    if (currAttempt.letterPos > wordLen - 1) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;  
    setNotice({ wordTooShort: false, wordInvalid: false });
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {    
    console.log(correctWord);
    let currWord = "";
    for (let i = 0; i < wordLen; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    console.log(board);

    if (currAttempt.letterPos !== wordLen) {            
      setNotice({ wordTooShort: true, wordInvalid: false });      
    } else if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: ++currAttempt.attempt, letterPos: 0 });
    } else {      
      setNotice({ wordTooShort: false, wordInvalid: true });
    }

    if (currWord == correctWord) {
      setGameOver({ gameOver: true, guessWord: true });
      return;
    }

    console.log(currAttempt.attempt + " " + attemptMax);
    if (currAttempt.attempt === attemptMax) {
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
          setGameOver,
          notice,
          wordLen,
          setWordLen,
          wordSet, 
          setWordSet
        }}
      >
        <div className="game">
          <Routes>
            <Route path='/' element={<LevelSelection />} />
            <Route path='/game/medium' element={<>
              <BoardMedium />
              {<Notice wordTooShort={notice.wordTooShort} wordInvalid={notice.wordInvalid} />}              
              {gameOver.gameOver ? <GameOver /> : <Keyboard />} </>} 
            />
            <Route path='/game/hard' element={<>            
            <BoardHard /> 
            {<Notice wordTooShort={notice.wordTooShort} wordInvalid={notice.wordInvalid} />}  
            {gameOver.gameOver ? <GameOver /> : <Keyboard />} </>} />
            <Route path='/rules' element={<Rules />} />
          </Routes>

        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
