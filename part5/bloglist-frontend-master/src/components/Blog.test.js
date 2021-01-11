import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('renders content', () => {
  let component
  beforeEach(() => {
    const Blogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '5ff5f04b67ca173024ff0c65',
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url:
            'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        user: '5ff5f04b67ca173024ff0c65',
      },
    ]
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url:
          'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      user: '5ff5f04b67ca173024ff0c65',
    }

    const setBlogs = jest.fn()
    component = render(
      <Blog blog={blog} blogs={Blogs} setBlogs={setBlogs} user='firo'/>,
    )
  })

  test('the component displaying a blog renders the blog\'s title and author', () => {
    const ele = component.container.querySelector('.hiddenWhenVisibleBlog')
    expect(ele).toHaveTextContent(
      'First class tests',
    )
    expect(ele).toHaveTextContent(
      'Robert C. Martin',
    )
  })

  test('the component displaying a blog does not render its url or number of likes by default', () => {
    const ele = component.container.querySelector('.hiddenWhenVisibleBlog')
    expect(ele).not.toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    )
    expect(ele).not.toHaveTextContent(
      10,
    )

  })

  test('checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked.', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.showWhenVisibleBlog')
    expect(div).not.toHaveStyle('display: none')
    expect(component.container).toHaveTextContent(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    )
    expect(component.container).toHaveTextContent(
      10,
    )
  })

})

