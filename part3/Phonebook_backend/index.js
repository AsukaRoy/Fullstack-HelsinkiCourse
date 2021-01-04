/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')


const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())


morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons/find', (request, response) => {
    Person.find({ 'name': 'firo' }).then(persons => {
        if (persons !== [])
            response.json(persons)
    })
})


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})


app.get('/info', (request, response, next) => {

    Person.find({}).then(persons => {
        const length = persons.length
        const static = `<p>Phonebook has info for ${length} people</p>`
        const date = new Date()
        response.send(static + date)
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    // eslint-disable-next-line no-undef
    const maxId = persons.length > 0
        // eslint-disable-next-line no-undef
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    else {
        Person.find({ 'name': body.name }).then(persons => {
            /*if (persons.length !== 0) {
                const person = {
                    name: body.name,
                    number: body.number || getRandomInt(10000000),
                }
                Person.findOneAndUpdate({ "name": body.name }, person, { new: true })
                    .then(updatedNote => {
                        response.json(updatedNote)
                    })
                    .catch(error => next(error))
            }
            else { */
            console.log('else')
            const person = new Person({
                name: body.name,
                number: body.number || getRandomInt(10000000),
            })
            person.save()
                .then(savedNote => {
                    response.json(savedNote.toJSON())
                })
                .catch(error => next(error))
            //}
        })

    }
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }
    console.log(request.params.id)
    console.log(person)
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})