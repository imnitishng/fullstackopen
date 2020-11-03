const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helpers')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('api returns', () => {

  test('correct number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })
})

describe('property exists and is named corectly in a blog', () => {

  test('"id": unique identifier property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('new blog post is', () => {

  test('successful', async () => {
    const blog = {
      title: 'new test blog',
      author: 'test author',
      url: 'test/blogs/1',
      likes: 21
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => blog.title)
    expect(contents).toHaveLength(helper.initialBlogs.length + 1)

    expect(contents).toContain('new test blog')
  })

  test('successful without the likes property', async () => {
    const blog = {
      title: 'new test blog',
      author: 'test author',
      url: 'test/blogs/1'
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })

  test('unsuccessful without title and url property', async () => {
    const blog = {
      url: 'test/blogs/1',
      likes: 19
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
