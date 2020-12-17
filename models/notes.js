const mongoose = require('mongoose')
const { Schema } = mongoose

const NotesSchema = new Schema({
  interval: String,
  noteNames: Array,
  url: String
})

module.exports = mongoose.model('Notes', NotesSchema)