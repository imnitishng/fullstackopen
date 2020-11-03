const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  if(request.body.likes === undefined)
    request.body.likes = 0

  const blog = new Blog(request.body)
  logger.info(blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error =>
      next(error)
    )
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