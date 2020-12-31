import React, { useState, useEffect } from 'react'
import PersonToShowFun from './components/PersonToShowFun'
import filterFun from './components/filterFun'
import addPersonFun from './components/addPersonFun'
import axios from 'axios'
import personServices from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

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

      {filterFun({ newFilter, setNewFilter, setShowAll })}

      {addPersonFun({ persons, newName, newNumber, setPersons, setNewName, setNewNumber })}

      {PersonToShowFun({ persons, newFilter, showAll, setPersons })}
    </div>
  )
}

export default App