import React from 'react'
import { Link } from 'react-router-dom'

function Rules() {
    return (
        <div className='container'>
            <h1>Rules</h1>
            <p>
                In medium mode, Wordle gives players six chances to guess a randomly selected six-letter word.
            </p>
            <p>
                In hard mode, Wordle gives players five chances to guess a randomly selected seven-letter word.
            </p>
            <p>
                If you have the right letter in the right spot, it shows up green.
                A correct letter in the wrong spot shows up yellow.
                A letter that isn't in the word in any spot shows up gray.
            </p>
            <Link id="rule-link" to='/'><h2>Back</h2></Link>
        </div>
    )
}

export default Rules