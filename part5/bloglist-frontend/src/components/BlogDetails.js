import React from 'react'

const BlogDetails = ({ blog, updateBlog, deleteBlog, userLoggedIn }) => {

  const addLike = () => {
    blog = { ...blog, likes: blog.likes+1 }
    updateBlog(blog)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  const userIsOwner = (userLoggedIn.username === blog.user.username)
  const showForOwner = { display: userIsOwner ? '' : 'none' }

  return (
    <div className='blogDetails'>
      {blog.url}<br/>
      likes {blog.likes}
      <button onClick={addLike}>like</button><br/>
      {blog.user.name}<br/>
      <span style={showForOwner}>
        <button onClick={removeBlog}>remove</button>
      </span>
    </div>
  )
}

export default BlogDetails