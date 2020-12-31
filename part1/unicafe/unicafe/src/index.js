import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const History = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <table>
          <tr> <Statistics value={good} text="good" /></tr>
          <tr><Statistics value={neutral} text="neutral" /></tr>
          <tr><Statistics value={bad} text="bad" /></tr>
          <tr><Statistics value={all} text="all" /></tr>
          <tr><Statistics value={all / 3.0} text="average" /></tr>
          <tr><Statistics value={(good / all) * 100 + "%"} text="positive" /></tr>
        </table>
      </div>
    )
  }

}

const Statistics = ({ text, value }) => <div>{text} {value}</div>

const Button = (props) => {
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setbad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setbad(bad + 1)
  }


  return (
    <div>
      <Header title={"give feedback"} />

      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <Header title={"statistics"} />
      <History good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)