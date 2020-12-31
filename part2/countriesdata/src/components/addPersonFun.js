const addPersonFun = ({ persons, newName,newNumber,setPersons, setNewName, setNewNumber }) => {

    const addPerson = (event) => {
      event.preventDefault()
      if (persons.filter(person => person.name === newName).length !== 0) {
        window.alert(`${newName} is already added to phonebook`);
      }
      else {
        const nameObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }
  
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
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