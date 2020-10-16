import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Filter from './components/Filter'
import AddNumber from './components/AddNumber'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setShow ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)
  const [ alertType, setAlertType ] = useState(0)

  const addEntry = (event) => {
    const oldEntry = persons.find(person => person.name === newName)

    if(oldEntry !== undefined) {
      event.preventDefault()
      if(window.confirm(`${newName} is already added to the phonebook, replace old with new?`)) {
        const personObject = {...oldEntry, number: newNumber}      
        console.log(personObject)  
        personService
          .updateContact(personObject)
          .then(response => {
            console.log(response)
            setPersons(persons.filter(person => person.name !== oldEntry.name).concat(personObject))
            setNewName('')
            setNewNumber('')
            setAlertType(0)
            setAlertMessage(`Updated ${personObject.name}`)
            setTimeout(() => {setAlertMessage(null)}, 5000)
          })
          .catch(error => {
            setAlertType(1)
            setAlertMessage(`Information of ${personObject.name} has already been removed from the server.`)
            setTimeout(() => {setAlertMessage(null)}, 5000)
            setPersons(persons.filter(person => person.id !== personObject.id))
          })
      }
    }
    else {
      event.preventDefault()
      const personObject = {
        name: newName, 
        number: newNumber
      }
        
      personService
        .saveContact(personObject)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setPersons(persons.concat(personObject))
          setAlertType(0)
          setAlertMessage(`Added ${personObject.name}`)
          setTimeout(() => {setAlertMessage(null)}, 5000)
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
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(getPersonHook, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={alertMessage} alertType={alertType}/>

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