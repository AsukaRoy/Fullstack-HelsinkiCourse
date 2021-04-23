import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const OK = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const BAD = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const ZERO = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={OK}>neutral</button> 
      <button onClick={BAD}>bad</button>
      <button onClick={ZERO}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)