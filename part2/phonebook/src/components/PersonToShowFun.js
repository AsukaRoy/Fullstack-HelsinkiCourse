import Person from './Person'
import personServices from '../services/persons'

const toggleToDelete = (id, name, persons,setPersons, setErrorMessage) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
        persons = persons.filter(n => n.id !== id)
        personServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons)
          console.log(persons);
        }).catch(error => {
            setErrorMessage(
              `Person '${name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons)
          })
        
    }
}

const PersonToShowFun = ({ persons, newFilter, showAll, setPersons, setErrorMessage}) => {
    const personToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
        <div>
            <h1>Number</h1>
            <ul>
                {personToShow.map(person =>
                    <Person key={person.id} person={person} toggleDelete={() => toggleToDelete(person.id, person.name, persons, setPersons, setErrorMessage)} />
                )}
            </ul>
        </div>
    )
}

export default PersonToShowFun