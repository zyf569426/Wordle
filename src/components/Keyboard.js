import React, { useContext, useEffect, useCallback } from 'react'
import Key from './Key';
import { AppContext } from "../App";

function Keyboard() {
  const {
    onSelectLetter,
    onDelete,
    onEnter,
    disabledLetters
  } = useContext(AppContext);

  const keys1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const keys2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const keys3 = ["z", "x", "c", "v", "b", "n", "m"];

  const handleKeyBoard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace"){
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });            
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyBoard);    
    return () => {
      document.removeEventListener("keydown", handleKeyBoard);
    };
  }, [handleKeyBoard]);

  return (
    <div className='keyboard' onKeyDown={handleKeyBoard}>
      <div className='line1'>
        {keys1.map((key) => {
          return <Key keyVal = {key} disabled={disabledLetters.includes(key)}/>;
        })}
        
      </div>
      <div className='line2'>
        {keys2.map((key) => {
          return <Key keyVal = {key} disabled={disabledLetters.includes(key)}/>;
        })}
        
      </div>
      <div className='line3'>
        <Key keyVal = {"ENTER"} bigKey/>
        {keys3.map((key) => {
          return <Key keyVal = {key} disabled={disabledLetters.includes(key)}/>;
        })}
        <Key keyVal = {"DELETE"} bigKey/>
      </div>
    </div>
  )
}

export default Keyboard;