import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [ alertType, setAlertType ] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedinBlogappUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedinBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (exception) {
      setAlertType(1)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logged out')
    window.localStorage.clear()
    setUser(null)
  }

  const saveBlog = async (event) => {
    event.preventDefault()
    blogService.create(newBlog)
    setNewBlog({title: '', author: '', url: ''})
    setBlogs(blogs.concat(newBlog))
    setAlertType(0)
    setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <form onSubmit={saveBlog}>
      title:<input 
        type="text" 
        value={newBlog.title} 
        onChange={({target}) => setNewBlog({...newBlog, title: target.value})}
      /><br/>
      author:<input 
        type="text" 
        value={newBlog.author} 
        onChange={({target}) => setNewBlog({...newBlog, author: target.value})}
      /><br/>
      url:<input
        type="text" 
        value={newBlog.url}
        onChange={({target}) => setNewBlog({...newBlog, url: target.value})}
      /><br/>
      <button type="submit">create</button>
    </form>
  )

  if(user === null) {
    return (
      <div>
        <Notification message={errorMessage} alertType={alertType}/>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type="text"
            value={username}
            name="username"
            onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input
            type="password"
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>)
  }
  return (    
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} alertType={alertType}/>
      <p>
        {user.name} logged in
        <button type="submit" onClick={handleLogout}>logout</button>
      </p>
      
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div> 
  )
}

export default App