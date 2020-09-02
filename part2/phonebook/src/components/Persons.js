import React from 'react'

const Person = ({person}) => {
  return (
    <>
      {person.name} {person.number}<br/>
    </>
  )
} 

const Persons = ({personToShow}) => {
  return (
    <>
      <h2>Numbers</h2> 
      {personToShow.map((person) => <Person key={person.name} person={person}/>)}
    </>
  )
}

export default Persons