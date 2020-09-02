import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddNumber from './components/AddNumber'
import Persons from './components/Persons'
import Axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
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

  const getPersonHook = () => {
    console.log('effect hook')
    Axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }
  useEffect(getPersonHook, [])
  
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