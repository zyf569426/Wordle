import React, { useContext } from 'react';
import { AppContext } from "../App";

function Notice({ wordTooShort, wordInvalid }) {
    const { notice } = useContext(AppContext);
    let noticeHtml = wordTooShort ? "Please enter a longer word" :
        wordInvalid ? "Not a valid word, please enter a new word" : <br></br>;
    return (
        <>
            <div className='notice'>
                <div >{noticeHtml}</div>
            </div>
        </>
    )
}

export default Notice