const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  if(request.body.likes === undefined)
    request.body.likes = 0

  let users = await User.find({})
  users.map(user => user.toJSON())

  const userForBlog = users[0]
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    name: request.body.name,
    url: request.body.url,
    likes: request.body.likes,
    user: userForBlog.id
  })
  logger.info(blog)

  try {
    const savedBlog = await blog.save()

    userForBlog.blogs = userForBlog.blogs.concat(savedBlog.id)
    await userForBlog.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, options)
    response.json(updatedBlog)
  }
  catch (error) {
    next(error)
  }
})

module.exports = blogsRouter