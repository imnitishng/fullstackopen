import React, { useState } from 'react'

const BlogDetails = ({ blog, updateBlog, deleteBlog, userLoggedIn }) => {
  const [likes, updateLikes] = useState(blog.likes)

  const addLike = () => {
    blog = { ...blog, likes: likes+1 }
    updateBlog(blog)
    updateLikes(blog.likes)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  const userIsOwner = (userLoggedIn.username === blog.user.username)
  const showForOwner = { display: userIsOwner ? '' : 'none' }

  return (
    <div>
      {blog.url}<br/>
      likes {likes}
      <button onClick={addLike}>like</button><br/>
      {blog.user.name}<br/>
      <span style={showForOwner}>
        <button onClick={removeBlog}>remove</button>
      </span>
    </div>
  )
}

export default BlogDetails