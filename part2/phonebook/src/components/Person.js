import React from 'react'

const Person = ({ person, toggleDelete}) => {
  const label = "delete"
  return (
    <li>{person.name} {person.number} <button onClick={toggleDelete}>{label}</button></li>
  )
}

export default Person