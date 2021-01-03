const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())


morgan.token('body', function(req, res) {
    return JSON.stringify(req.body);
});



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}




let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-1234567",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.get('/info', (request, response) => {
    const static = `<p>Phonebook has info for ${persons.length} people</p>`
    const date = new Date()
    response.send(static + date)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    console.log(persons)
    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    } else if (persons.filter(person => person.name.toLowerCase() === body.name.toLowerCase()).length !== 0) {

        return response.status(403).json({
            error: 'The name already exists in the phonebook'
        })
    }
    else {
        const person = {
            name: body.name,
            number: body.number || getRandomInt(10000000),
            id: generateId(),
        }
        persons = persons.concat(person)

        response.json(person)
    }
})


app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})