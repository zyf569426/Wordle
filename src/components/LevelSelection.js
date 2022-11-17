import React, { useContext } from 'react';
import { AppContext } from "../App"
import { Link } from 'react-router-dom'
import { generateWordSet } from "../Words";

function LevelSelection() {
  const { generateWordSet, wordLen, setWordLen, setWordSet, setCorrectWord } = useContext(AppContext);
  return (
    <div className='container'>
      <h1>Select your level</h1>
      <ul class='levels'>
        <Link onClick={ () => setLevel(6) } id="medium-level-link" to='/game/medium'><li>Medium</li></Link>
        <Link onClick={ () => setLevel(7) } id="hard-level-link" to='/game/hard'><li>Hard</li></Link>
      </ul>
      <Link id="rule-link" to='/rules'><h2>Rules</h2></Link>
    </div>
  )

  function setLevel(len) {

    setWordLen(len);
    // generateWordSet().then((words) => {
    //   setWordSet(len === 6 ? words.wordSetMedium : words.wordSetHard );
    //   setCorrectWord(len === 6 ? words.todaysWordMedium : words.todaysWordHard );    
    // });  
    console.log("test");
    console.log(len);    
    console.log(wordLen);
  }  
}

export default LevelSelection