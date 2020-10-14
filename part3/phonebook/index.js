const express = require('express')
const morgan = require('morgan')
const { response } = require('express')

const app = express()

app.use(express.json())
morgan.token('content', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-123456"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "040-344322"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people\n\n${new Date()}`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const personID = Number(request.params.id)
  const person = persons.find(person => person.id === personID)
  if(person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

const generateID = () => (
  Math.floor(Math.random()*1000)
)

app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.number) {
    response.status(400).json({
      error: "missing number"
    })
  }
  else if(!body.name) {
    response.status(400).json({
      error: "missing name"
    })
  }
  else {
    const nameAlreadyExist = persons.find(person => person.name === body.name)
    if(nameAlreadyExist) {
      response.status(400).json({
        error: "name must be unique"
      })
    }
    else {
      const person = {
        id: generateID(),
        name: body.name,
        number: body.number
      }
      persons = persons.concat(person)
      response.json(person)
    }
  }
})

const PORT = 3301
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})