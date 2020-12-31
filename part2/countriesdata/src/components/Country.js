import React from 'react'
import Weather from './Weather'

const Country = ({ country, setNewFilter}) => {
    //console.log(country.callingCodes[0])
    const handleToShow = (event) => {
        setNewFilter(country.name)
    }

    return (
        <div>
            <form>
                <div>
                    <li id={country.callingCodes[0]}>
                        {country.name} <button type="button" onClick={handleToShow}>show</button>
                    </li>
                </div>
            </form>
        </div>
    )
}

const Language = ({ language }) => {
    return (
        <li>{language.name}</li>
    )
}

const CountryDetails = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            {country.languages.map(language =>
                <Language language={language} />
            )}
            <img src={country.flag} alt={country.name} width="150" height="100"></img>

            <Weather country={country} />
        </div>
    )
}

export { Country, CountryDetails } 