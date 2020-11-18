import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

let blog, user
describe('When blogs list is rendered', () => {

  beforeEach(() => {
    blog = {
      title: 'test blog 1',
      author: 'test author 1',
      url: 'test/blogs/1',
      likes: 11,
      user: {
        username: 'nitish'
      }
    }
    user = {
      username: 'nitish',
      user: 'nitish',
      token: 'sdhgifhgi2397hfgbd842'
    }
  })

  test('only blog title and author are rendered', () => {
    const component = render(
      <Blog blog={blog} userLoggedIn={user}/>
    )

    expect(component.container).toHaveTextContent('test blog 1')
    expect(component.container).toHaveTextContent('test author 1')
    expect(component.container).not.toHaveTextContent('test/blogs/1')
    expect(component.container).not.toHaveTextContent('11')
  })

  test('URL and likes of blog are shown only after clicking "view" button', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} userLoggedIn={user} deleteBlog={mockHandler} updateBlog={mockHandler}/>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('test/blogs/1')
    expect(component.container).toHaveTextContent('11')
  })

  test('clicking "like" button for a blog works', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} userLoggedIn={user} deleteBlog={mockHandler} updateBlog={mockHandler}/>
    )

    const viewbutton = component.getByText('view')
    fireEvent.click(viewbutton)

    const likebutton = component.getByText('like')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)
    expect(mockHandler).toHaveBeenCalledTimes(2)
  })

  test('form for creating a new blog works', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const inputtitle = component.container.querySelector('#title')
    const inputauthor = component.container.querySelector('#author')
    const inputurl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputauthor, { target: { value: 'nitish' } })
    fireEvent.change(inputtitle, { target: { value: 'blogtitle' } })
    fireEvent.change(inputurl, { target: { value: 'http//sad' } })
    fireEvent.submit(form)

    expect(createBlog).toHaveBeenCalledWith({ 'author': 'nitish', 'title': 'blogtitle', 'url': 'http//sad' })
  })
})