import React from 'react'
import Axios from 'axios'

const Country = ({country}) => {
  return (
    <>    
      {country}<br/>
    </>
  )
}

const CountryLanguages = ({name}) => {
  return (
    <li>
      {name}
    </li>
  )
}

const CountryDetails = ({country}) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>
        capital {country.capital}<br/>
        popultation {country.population}
      </p>
      <h3><b>languages</b></h3>
      <ul>
        {country.languages.map((val) => <CountryLanguages key={val.iso639_1} name={val.name}/>)}
      </ul>
      <img src={country.flag} alt="flag" width="200" height="150"/>
    </>
  )
}

const Countries = ({countriesToShow}) => {
  if (countriesToShow.length == 1)
    return (
      <CountryDetails country={countriesToShow[0]}/>
    )
  else if (countriesToShow.length < 10)
    return (
      <>
        {countriesToShow.map((val) => <Country key={val.numericCode} country={val.name} />)}
      </>
    )
  else if (countriesToShow.length > 10)
    return (
      <>
        Too many matches, specify another filter
      </>
    )
}

export default Countries