/* eslint-disable no-undef */
const mongoose = require('mongoose')
const config = require('./utils/config')
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}


mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})

//note.save().then(result => {
//  console.log('note saved!')
//  mongoose.connection.close()
//})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
  mongoose.connection.close()
})