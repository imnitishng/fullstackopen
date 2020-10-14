import React from 'react'

const Person = ({person, deleteEntry}) => {
  return (
    <>
      {person.name} {person.number}  
      <button onClick={() => deleteEntry(person.name, person.id)}> delete </button><br/>
    </>
  )
} 

const Persons = ({personToShow, deleteEntry}) => {
  return (
    <>
      <h2>Numbers</h2> 
      {personToShow.map((person) => 
        <Person 
          key={person.name} 
          person={person} 
          deleteEntry={deleteEntry}
        />)
      }
    </>
  )
}

export default Persons