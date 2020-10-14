import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Weather = ({countryCapital}) => {
  const [weatherData, setWeather] = useState()
  
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const params = {
    access_key: api_key,
    query: countryCapital
  }
  const getWeatherHook = () => {
    Axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      console.log(response.data)
      setWeather(response.data)
    })
  }
  useEffect(getWeatherHook, [])

  if (weatherData == undefined)
    return (
      <>
        <b>Loading...</b>
      </>
    )
  else
    return (
      <>
        <h3>Weather in {countryCapital}</h3>
        <b>temperature: </b> {weatherData.current.temperature} Celcius<br/>
        <img src={weatherData.current.weather_icons[0]} alt="flag" width="50" height="50"/><br/>
        <b>temperature: </b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}<br/>
      </>    
    )
  
}

export default Weather