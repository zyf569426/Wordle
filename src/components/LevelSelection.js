import React, { useContext } from 'react';
import { AppContext } from "../App"
import { Link } from 'react-router-dom'

function LevelSelection() {
  const { setWordLen } = useContext(AppContext);
  return (
    <div className='container'>
      <h1>Select your level</h1>
      <ul class='levels'>
        <Link onClick={() => setWordLen(6)} id="medium-level-link" to='/game/medium'><li>Medium</li></Link>
        <Link onClick={() => setWordLen(7)} id="hard-level-link" to='/game/hard'><li>Hard</li></Link>
      </ul>
      <Link id="rule-link" to='/rules'><h2>Rules</h2></Link>
    </div>
  )
}

export default LevelSelection