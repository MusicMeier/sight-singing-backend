const mongoose = require('mongoose')
const { Schema } = mongoose

const FrequenciesSchema = new Schema({
  interval: String,
  noteNames: Array,
  frequency: Array,
  upperBoundary: Array,
  lowerBoundary: Array,
  url: String
})

module.exports = mongoose.model('Frequencies', FrequenciesSchema)