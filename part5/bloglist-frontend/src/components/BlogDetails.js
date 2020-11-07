import React, { useState } from 'react'

const BlogDetails = ({ blog }) => {
  return (
    <div>
      {blog.url}<br/>
      likes {blog.likes}
      <button>like</button><br/>
      {blog.user.name}
    </div>
  )
}

export default BlogDetails