import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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
})