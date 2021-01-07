import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LogInfo from './components/LogInfo'
const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setAuthorChange] = useState('')
  const [newURL, setURLChange] = useState('')
  const [newLikes, setLikesChange] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [logMessage, setLogMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logOutForm = () => {

    return (
      <form onSubmit={handleLogOut}>
        <button type="submit">logout</button>
      </form>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: newLikes
    }

    blogService
      .create(blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.concat(returnedBlogs))
        setLogMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setLogMessage(null)
        }, 5000)
        setNewTitle('')
        setLikesChange('')
        setLikesChange('')
        setURLChange('')
      })
  }

  const handleBlogChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthorChange(event.target.value)
  }

  const handleURLChange = (event) => {
    setURLChange(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikesChange(event.target.value)
  }


  const addBlogForm = () => (
    <form onSubmit={addBlog}>
      <h2>add a new blog</h2>
      <div>
        newTitle
        <input
          value={newTitle}
          onChange={handleBlogChange}
        />
      </div>
      <div>
      newAuthor
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
      newURL
        <input
          value={newURL}
          onChange={handleURLChange}
        />
      </div>
      <div>
      newLikes
        <input
          value={newLikes}
          onChange={handleLikesChange}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )



  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <LogInfo message={logMessage} />
      {
        user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged-in {user !== null && logOutForm()}</p>
            <p>{user !== null && addBlogForm()}</p>
            {
              blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )
            }
          </div>
      }



    </div>
  )
}

export default App