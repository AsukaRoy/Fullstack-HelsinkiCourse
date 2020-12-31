import {Country, CountryDetails} from './Country'



const CountriesToShowFun = ({ countries, newFilter, showAll , setNewFilter}) => {
    const countriesToShow = showAll
        ? countries
        : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    if(countriesToShow.length >= 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>.
            </div>
        )
    }

    if(countriesToShow.length === 1) {
        return (
            <div>
                {countriesToShow.map(country =>
                    <CountryDetails country={country} />
                )}
               
            </div>
        )
    }
    else {
        return (
            <div>
                {countriesToShow.map(country =>
                    <Country country={country} setNewFilter = {setNewFilter}/>
                )}
               
            </div>
        )
    }
    
}

export default CountriesToShowFun