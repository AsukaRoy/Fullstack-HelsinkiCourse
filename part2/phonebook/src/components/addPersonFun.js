import axios from 'axios'
import personServices from '../services/persons'

const addPersonFun = ({ persons, newName, newNumber, logMessage, setPersons, setNewName, setNewNumber, setLogMessage, setErrorMessage }) => {
  
  const addPerson = (event) => {
    
    event.preventDefault()
    console.log("test");
    if (persons.filter(person => person.name === newName).length !== 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n => n.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personServices
          .update(person.id, changedPerson)
          .then(returnedNote => {
            console.log(returnedNote);
            setPersons(persons.map(n => n.name !== newName ? n : returnedNote))
            setNewName('')
            setNewNumber('')
          })
      }

    }
    else {
      console.log("test");
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      personServices
        .create(nameObject)
        .then(response => {
          setLogMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setLogMessage(null)
          }, 5000)
          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          // this is the way to access the error message
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        
    }
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h1>add a new</h1>

      <form onSubmit={addPerson}>

        <div>
          name:<input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


export default addPersonFun