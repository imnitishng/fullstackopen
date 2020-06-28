import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({text, value}) => {
    return (
    <>
      <p>{text} {value}</p>
    </>
    )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allclicks, setAll] = useState(0)
  const [average, setAvg] = useState(0)
  const [fb, setFeedback] = useState(0)

  const handleGood = () => {
    setFeedback(fb+1)
    setAvg(average+1)
    setAll(allclicks+1)
    setGood(good+1)
  }

  const handleNeutral = () => {
    setFeedback(fb+1)
    setAvg(average+0)
    setAll(allclicks+1)
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setFeedback(fb+1)
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
    positive: good/allclicks*100,
    feedback: fb
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <h1>statistics</h1>
      <div>
        <Statistics text='good' value={stats.good} />
        <Statistics text='neutral' value={stats.neutral} />
        <Statistics text='bad' value={stats.bad} />
        <Statistics text='all' value={stats.all} />
        <Statistics text='avg' value={stats.avg} />
        <Statistics text='positive' value={stats.positive} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)