import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const saveContact = newContact => {
    return axios.post(baseURL, newContact)
}

const deleteContact = (contactID) => {
    const deleteURL = `${baseURL}/${contactID}`
    return axios.delete(deleteURL)
}

export default { 
    saveContact: saveContact,
    deleteContact: deleteContact
  }