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

module.exports = blogsRouter