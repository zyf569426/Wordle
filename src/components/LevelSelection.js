import React from 'react'
import { AppContext } from "../App"
import { Link } from 'react-router-dom'

function LevelSelection() {
  return (
    <div className='container'>
        <h1>Select your level</h1>
        <ul class='levels'>
        <Link id="medium-level-link" to='/game/medium'><li>Medium</li></Link>
        <Link id="hard-level-link" to='/game/hard'><li>Hard</li></Link>            
        </ul>                
    </div>

  )
}

export default LevelSelection