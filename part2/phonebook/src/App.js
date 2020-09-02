import React, { useState } from 'react'
import Filter from './components/Filter'
import AddNumber from './components/AddNumber'
import Persons from './components/Persons'

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      <AddNumber 
        newNumber={newNumber} 
        newName={newName}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
        addEntry = {addEntry}
      />

      <Persons 
        personToShow={personToShow}
      />
    </div>
  )
}

export default App