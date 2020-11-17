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

  const blogDetails = () => {
    if(visible)
      return (
        <span style={showWhenVisible}>
          <button onClick={toggleVisibility}>hide</button>
          <BlogDetails blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userLoggedIn={userLoggedIn}/>
        </span>
      )
    else
      return (
        <span style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </span>
      )
  }

  return (
    <div style={blogStyle} className='abcd'>
      {blog.title} {blog.author}
      {blogDetails()}
    </div>
  )
}

export default Blog
