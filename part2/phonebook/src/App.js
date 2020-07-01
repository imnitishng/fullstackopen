import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setShow ] = useState('')

  const addEntry = (event) => {
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      event.preventDefault()
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setShow(event.target.value)
  }
  
  const personToShow = searchTerm.length === 0 ?
  persons : persons.filter((person) => {
    if(person.name.toLowerCase().includes(searchTerm.toLowerCase()))
      return (person)
  })

  console.log(personToShow)

  const Person = ({person}) => {
    return (
      <>
        {person.name} {person.number}<br/>
      </>
    )
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={searchTerm} onChange={handleSearch}/></p>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2> 
      {personToShow.map((person) => <Person key={person.name} person={person}/>)}
    </div>
  )
}

export default App