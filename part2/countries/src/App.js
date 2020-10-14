import React, { useState, useEffect } from 'react';
import Search from './Components/Search'
import Countries from './Components/Countries'
import Axios from 'axios';

const  App = () => {

  const [country, setCountry] = useState('')
  const [allCountries, setCountries] = useState([])

  const getCountriesHook = () => {
    Axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(getCountriesHook, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const countriesToShow = country.length === 0 ?
  allCountries : allCountries.filter((val) => {
    if(val.name.toLowerCase().includes(country.toLowerCase()))
      return (val)
  })

  return (
    <div>

      <Search 
        handleCountryChange={handleCountryChange}
      />

      <Countries
        setCountry={setCountry}
        countriesToShow={countriesToShow}
      />

    </div>
  );
}

export default App;
