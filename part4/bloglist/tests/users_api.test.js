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
    const user = {
      username: 'user1',
      name: 'user1',
      password: 'user1'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
