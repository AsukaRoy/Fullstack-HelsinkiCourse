import React, { useState, useEffect} from 'react'
import filterFun from './components/filterFun'
import CountriesToShowFun from './components/CountriesToShowFun'
import axios from 'axios'

const App = () => {
  

  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [countries, setCountries] = useState([])
  
  //const [selectedCountry, setSelectedCountry] = useState([])
  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
       // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  

  return (
    <div>
      {filterFun({newFilter, setNewFilter, setShowAll})}
      {CountriesToShowFun({ countries, newFilter, showAll, setNewFilter})}

    </div>
  )
}

export default App