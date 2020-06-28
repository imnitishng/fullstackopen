import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, highest: 0})

  const newAnecdote = (max) => () => {   
    setSelected(Math.floor(Math.random()*max))
  }

  const voteSetter = () => {
    const copy = {...points}
    copy[selected] += 1
    if(copy[selected] > copy[copy.highest])
      copy.highest = selected
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <p>
        <button onClick={voteSetter}>vote</button>
        <button onClick={newAnecdote(anecdotes.length)}>next anecdote</button>
      </p>
      <h1>Anecdote with most votes</h1>
        {props.anecdotes[points.highest]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)