import React, { useState } from 'react'

const BlogDetails = ({ blog, updateBlog }) => {
  const [likes, updateLikes] = useState(blog.likes)

  const addLike = () => {
    blog = {...blog, likes: likes+1}
    updateBlog(blog)
    updateLikes(blog.likes)
  }
  
  return (
    <div>
      {blog.url}<br/>
      likes {likes}
      <button onClick={addLike}>like</button><br/>
      {blog.user.name}
    </div>
  )
}

export default BlogDetails