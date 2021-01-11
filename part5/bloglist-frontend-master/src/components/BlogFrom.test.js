import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import AddBlogForm from './BlogFrom'



describe('renders content', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    const setLogMessage = jest.fn()
    const component = render(
      <AddBlogForm createBlog={createBlog} setLogMessage={setLogMessage}/>
    )

    const form = component.container.querySelector('form')
    const input_1 = component.container.querySelector('.input1')
    const input_2 = component.container.querySelector('.input2')
    const input_3 = component.container.querySelector('.input3')
    const input_4 = component.container.querySelector('.input4')

    fireEvent.change(input_1, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(input_2, {
      target: { value: 'Ito' }
    })
    fireEvent.change(input_3, {
      target: { value: 'http://blog.cleancoder.com/' }
    })
    fireEvent.change(input_4, {
      target: { value: '8' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )

  })
})