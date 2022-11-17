import React, {useContext} from 'react';
import { AppContext } from "../App";

function Notice({ wordTooShort, wordInvalid }) {
    const { notice } = useContext(AppContext);
    // let wordTooShortNotice = wordTooShort ? "Please enter a longer word" : <br></br>;
    // let wordInvalidNotice = wordInvalid ? "Not a valid word, please enter a new word" : <br></br>;
    let noticeHtml = wordTooShort ? "Please enter a longer word" : 
    wordInvalid ? "Not a valid word, please enter a new word" : <br></br>;
    // console.log(wordTooShortNotice);
    // console.log(wordInvalidNotice);
  return (
      <>
        <div className='notice'>
            <div >{noticeHtml}</div>
            {/* <div >{wordInvalidNotice}</div> */}
        </div>
      </>
  )
}

export default Notice