import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if(props.stats.all === 0)
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  else
  return (
  <>
    <p>good {props.stats.good}</p>
    <p>neutral {props.stats.neutral}</p>
    <p>bad {props.stats.bad}</p>
    <p>all {props.stats.all}</p>
    <p>average {props.stats.avg}</p>
    <p>positive {props.stats.positive}%</p>
  </>
  )
}

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

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: allclicks,
    avg: average/allclicks,
    positive: good/allclicks*100
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h1>statistics</h1>
        <Statistics stats={stats}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)