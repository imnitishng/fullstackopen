const mongoose = require('mongoose')

const password = process.argv[2]
const dbname = 'phonebook'
const url =
  `mongodb+srv://admin:${password}@fullstackopen-cluster.qdzis.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]

  const generateID = () => (
    Math.floor(Math.random()*100)
  )
  const person = new Person({
    id: generateID(),
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  }).catch(error => {
    console.log(error)
  })
}
else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
