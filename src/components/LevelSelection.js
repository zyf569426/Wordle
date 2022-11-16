import React from 'react'
import { AppContext } from "../App"
import { Link } from 'react-router-dom'

function LevelSelection() {
  return (
    <div className='container'>
        <h1>Select your level</h1>
        <ul class='levels'>
            <li><Link to='/game/medium'>Medium</Link></li>
            <li><Link to='/game/hard'>Hard</Link></li>            
        </ul>
    </div>

  )
}

export default LevelSelection