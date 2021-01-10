import React, { useState } from 'react'


const Blog = ({ blog }) => {
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
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}</div>
        <button onClick={() => setBlogDetailVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default Blog
