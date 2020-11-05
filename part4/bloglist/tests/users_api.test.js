const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')
const User = require('../models/users')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for(let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }
})

describe('when some users already exist', () => {

  test('creating user with same username', async () => {
    const usersAtStart = await helper.usersInDB()
    const user = {
      username: 'user1',
      name: 'user1',
      password: 'user1'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating user password < 3 charachters', async () => {
    const usersAtStart = await helper.usersInDB()
    const user = {
      username: 'user1',
      name: 'user1',
      password: '1'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be more than 3 characters')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
