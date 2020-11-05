const jwt = require('jsonwebtoken')
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
  try {
    const decodedToken = jwt.verify(request.body.token, process.env.SECRET)
    if (!request.body.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userForBlog = await User.findById(decodedToken.id)

    if(request.body.likes === undefined)
      request.body.likes = 0

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      name: request.body.name,
      url: request.body.url,
      likes: request.body.likes,
      user: userForBlog.id
    })
    logger.info(blog)

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