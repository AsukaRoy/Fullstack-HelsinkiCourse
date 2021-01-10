import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LogInfo from './components/LogInfo'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddBlogForm from './components/BlogFrom'
const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('firo')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [logMessage, setLogMessage] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    console.log(username);
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.concat(returnedBlogs))
      })
  }

  const addBlogForm = () => (
    <Togglable buttonLabel='new blog'>
      <AddBlogForm
        addBlog={addBlog}
        setLogMessage = {setLogMessage}
      />
    </Togglable>
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
                <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
              )
            }
          </div>
      }
    </div>
  )
}

export default App