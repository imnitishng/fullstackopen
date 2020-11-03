const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
  try {
    console.log(request.body)
    const body = request.body
    if(body.password.length < 3) {
      response.status(400).json({ error: 'password must be more than 3 characters' })
    }
    else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })
      const savedUser = await user.save()
      response.json(savedUser)
    }
  }
  catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    response.json(users)
  }
  catch (error) {
    next(error)
  }
})

module.exports = usersRouter