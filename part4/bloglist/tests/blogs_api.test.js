const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('./test_helper')

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
    const blogs = await helper.blogsInDB()

    expect(blogs).toHaveLength(2)
  })
})

describe('property exists and is named corectly in a blog', () => {

  test('"id": unique identifier property', async () => {
    const blogs = await helper.blogsInDB()

    expect(blogs[0].id).toBeDefined()
  })
})

describe('posting a new blog is', () => {

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

describe('when some blogs already exist', () => {

  test('deleting a blog is successful', async () => {
    const blogsBeg = await helper.blogsInDB()
    const blogtoDelete = blogsBeg[0]

    await api
      .delete(`/api/blogs/${blogtoDelete.id}`)
      .expect(204)

    const blogsEnd = await helper.blogsInDB()
    expect(blogsEnd).toHaveLength(blogsBeg.length - 1)

    const contents = blogsEnd.map(r => r.title)
    expect(contents).not.toContain(blogtoDelete.title)
  })

  test('updating a blog is successful', async () => {
    const blogsBeg = await helper.blogsInDB()
    const blogtoUpdate = blogsBeg[0]
    const updatedBlog =   {
      title: 'updated blog',
      author: 'updated test author',
      url: 'test/blogs/2',
      likes: 22
    }

    await api
      .put(`/api/blogs/${blogtoUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsEnd = await helper.blogsInDB()
    const contents = blogsEnd.map(r => r.title)
    expect(contents).toContain(updatedBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
