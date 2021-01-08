import React, { useState } from 'react'

const AddBlogForm = ({ createBlog, setLogMessage }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setAuthorChange] = useState('')
    const [newURL, setURLChange] = useState('')
    const [newLikes, setLikesChange] = useState('')

    const handleTitleChange = (event) => {
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

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL,
            likes: newLikes
        })

        setNewTitle('')
        setLikesChange('')
        setLikesChange('')
        setURLChange('')
        setLogMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setLogMessage(null)
        }, 5000)

    }

    return (
        <form onSubmit={addBlog}>
            <h2>add a new blog</h2>
            <div>
                newTitle
                <input
                    value={newTitle}
                    onChange={handleTitleChange} />
            </div>
            <div>
                newAuthor
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange} />
            </div>
            <div>
                newURL
                <input
                    value={newURL}
                    onChange={handleURLChange} />
            </div>
            <div>
                newLikes
                <input
                    value={newLikes}
                    onChange={handleLikesChange} />
            </div>
            <button type="submit">save</button>
        </form>
    )
}

export default AddBlogForm