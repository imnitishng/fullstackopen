import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const saveContact = newContact => {
    return axios.post(baseURL, newContact)
}

export default { 
    saveContact: saveContact
  }