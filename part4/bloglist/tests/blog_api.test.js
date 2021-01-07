const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

})

describe('when there is initially some notes saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })


    test('the id of blog are defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})
describe('addition of a new note', () => {
    test('a valid note can be added ', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcm8iLCJpZCI6IjVmZjVmMDRiNjdjYTE3MzAyNGZmMGM2NSIsImlhdCI6MTYwOTk1NTQzOX0.J-RnP-qviHVSQphTYe60CD-vwNjAiCkdSaMRAXJOnOg')
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'Canonical string reduction'
        )
    })
    test(' adding a blog fails with the proper status code 401 Unauthorized if a token is not provided', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

    })
    test('likes property can be missing', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcm8iLCJpZCI6IjVmZjVmMDRiNjdjYTE3MzAyNGZmMGM2NSIsImlhdCI6MTYwOTk1NTQzOX0.J-RnP-qviHVSQphTYe60CD-vwNjAiCkdSaMRAXJOnOg')
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body[helper.initialBlogs.length].likes).not.toBeDefined()
    })


    test('required properties cannot be missing', async () => {
        const newBlog = {
            author: 'Michael Chan',
            likes: 7
        }
        await api
            .post('/api/blogs')
            .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcm8iLCJpZCI6IjVmZjVmMDRiNjdjYTE3MzAyNGZmMGM2NSIsImlhdCI6MTYwOTk1NTQzOX0.J-RnP-qviHVSQphTYe60CD-vwNjAiCkdSaMRAXJOnOg')
            .send(newBlog)
            .expect(400)
    })
})
describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        console.log(blogToDelete)
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZpcm8iLCJpZCI6IjVmZjVmMDRiNjdjYTE3MzAyNGZmMGM2NSIsImlhdCI6MTYwOTk1NTQzOX0.J-RnP-qviHVSQphTYe60CD-vwNjAiCkdSaMRAXJOnOg')
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const title = blogsAtEnd.map(r => r.title)

        expect(title).not.toContain(blogToDelete.title)
    })
})

describe('change likes of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const newBlog = {
            likes: 50
        }
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        const blogUpdated = blogsAtEnd[0]


        expect(blogUpdated.likes).toBe(newBlog.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})