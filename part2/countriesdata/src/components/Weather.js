import React, { useState, useEffect } from "react";
import axios from "axios";



const Weather = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)
    const [weather, setWeather] = useState([])

    useEffect(() => {
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
        axios
          .get(url)
          .then(response => {
            setWeather(response.data.current)
            console.log(weather)
          })
      }, [])
    

    return (
        <div>
            <h1>Weather in {country.capital}</h1>
            <p><b>temperature:</b> {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt={`weather in ${country.capital}`} width="150" height="100"></img>
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather