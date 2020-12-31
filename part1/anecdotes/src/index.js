import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = (props) => {
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
let randomNum = 0;
const points = [0,0,0,0,0]
const pointsCopy = [...points]
const App = () => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)


  
  const setSelectAnecdotes = () => {
    randomNum = randomNumber(0, 5)
    setSelected(randomNum)
    setVote(pointsCopy[randomNum])
  }


  const setVoteAnecdotes = () => {
    let randomNumcopy = randomNum
    pointsCopy[randomNumcopy] += 1
    setVote(pointsCopy[randomNumcopy])
  }

  return (
    <div>
      {anecdotes[selected]}
      <div>
        has {vote} votes
      </div>
      <div>
        <Button onClick={setVoteAnecdotes} text='vote' />
        <Button onClick={setSelectAnecdotes} text='next anecdote' />
      </div>
    </div>
  )
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
)