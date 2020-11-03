const Blog = require('../models/blogs')

const initialBlogs = [
  {
    title: 'test blog 1',
    author: 'test author 1',
    url: 'test/blogs/1',
    likes: 21
  },
  {
    title: 'test blog 2',
    author: 'test author 2',
    url: 'test/blogs/2',
    likes: 22
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDB
}