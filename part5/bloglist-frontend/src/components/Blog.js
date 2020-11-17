import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, updateBlog, deleteBlog, userLoggedIn }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <BlogDetails blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userLoggedIn={userLoggedIn}/>
      </span>
    </div>
  )
}

export default Blog
