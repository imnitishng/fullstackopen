import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Filter from './components/Filter'
import AddNumber from './components/AddNumber'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setShow ] = useState('')
  // const [ deleteContactID, setDeleteID ] = useState(0)

  const addEntry = (event) => {
    if(persons.find(person => person.name === newName)) {
      alert(`${newName} already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      event.preventDefault()
      const personObject = {
        name: newName, 
        number: newNumber,
        id: Math.floor(Math.random() * 101)}
        
      personService
        .saveContact(personObject)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(personObject))
          // console.log(response)
        })
    }
  }

  const deleteEntry = (contactName, contactID) => {
    if(window.confirm(`Delete ${contactName}?`)) {
      personService
        .deleteContact(contactID)
        .then(response => {
          console.log(persons)
          setNewName('')
          setNewNumber('')
          setPersons(persons.filter(person => person.id !== contactID))
        })
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
        deleteEntry={deleteEntry}
      />
    </div>
  )
}

export default App