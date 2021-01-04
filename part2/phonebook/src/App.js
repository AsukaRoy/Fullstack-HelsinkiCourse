import React, { useState, useEffect } from 'react'
import PersonToShowFun from './components/PersonToShowFun'
import filterFun from './components/filterFun'
import addPersonFun from './components/addPersonFun'
import axios from 'axios'
import personServices from './services/persons'
import LogMessage from './components/LogMessage'
import Notification from './components/Notification'
import './index.css'
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [logMessage, setLogMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      {LogMessage ({logMessage})}
      <Notification message={errorMessage} />
      {filterFun({ newFilter, setNewFilter, setShowAll })}

      {addPersonFun({ persons, newName, newNumber, logMessage, setPersons, setNewName, setNewNumber, setLogMessage, setErrorMessage})}

      {PersonToShowFun({ persons, newFilter, showAll, setPersons, setErrorMessage })}
    </div>
  )
}

export default App