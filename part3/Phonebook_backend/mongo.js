/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}



const password = process.argv[2]

const url =
    `mongodb+srv://firoy2h:${password}@cluster0.u8v9y.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
})

const Person = mongoose.model('Person', phoneSchema)



if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook')
        result.forEach(Person => {
            console.log(Person.name, Person.number)
        })
        mongoose.connection.close()
    })
}
else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
        important: false,
    })
    person.save().then(() => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}


