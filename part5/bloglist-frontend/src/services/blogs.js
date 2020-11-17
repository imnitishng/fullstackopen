import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  console.log(newToken)
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(newBlog, config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(updatedBlog, config)
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return response.data
}

export default { getAll, create, setToken, update }