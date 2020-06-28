import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allclicks, setAll] = useState(0)
  const [average, setAvg] = useState(0)

  const handleGood = () => {
    setAvg(average+1)
    setAll(allclicks+1)
    setGood(good+1)
  }

  const handleNeutral = () => {
    setAvg(average+0)
    setAll(allclicks+1)
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setAvg(average-1)
    setAll(allclicks+1)
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h1>statistics</h1>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {allclicks}</p>
        <p>average {average/allclicks}</p>
        <p>positive {good/allclicks*100}%</p>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)