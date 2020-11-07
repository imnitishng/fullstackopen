import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  const submitBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({title: '', author: '', url: ''})
  }

  return (
    <form onSubmit={submitBlog}>
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
}

export default BlogForm