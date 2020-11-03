const Blog = require('../models/blogs')
const User = require('../models/users')

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

const initialUsers = [
  {
    username: 'user1',
    name: 'user1',
    password: 'user1'
  },
  {
    username: 'user2',
    name: 'user2',
    password: 'user2'
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers,
  blogsInDB, usersInDB
}