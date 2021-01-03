const express = require('express')
const app = express()

app.use(express.json())

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
    console.log(body);
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
            number: getRandomInt(10000000),
            id: generateId(),
        }
        persons = persons.concat(person)

        response.json(person)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})