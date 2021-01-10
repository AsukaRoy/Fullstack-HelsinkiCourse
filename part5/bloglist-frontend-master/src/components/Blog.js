import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogDetailVisible, setBlogDetailVisible] = useState(false)

  const hideWhenVisible = { display: blogDetailVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailVisible ? '' : 'none' }



  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>{blog.title} | {blog.author}</div>
        <button onClick={() => setBlogDetailVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title} <button onClick={() => setBlogDetailVisible(false)}>hide</button></div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={() => {
          blogService
            .update(blog.id, blog)
            .then(returnedBlog => {
              setBlogs(blogs.map(object => object.id !== blog.id ? object : returnedBlog))
            })
        }}>increase likes</button></div>

        <div>
          {console.log(user)}
          {console.log(blog.user.username)}
          {user.username === blog.user.username && <button onClick={() => {

            if (window.confirm(`Remove blog You're NOT goona need it! by ${blog.author}?`)) {
              blogService
                .remove(blog.id)
                .then(() => {
                  setBlogs(blogs.filter(object => object.id !== blog.id))
                })
            }
          }}>remove</button>}
        </div>

      </div>

    </div>
  )
}

export default Blog
