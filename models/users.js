const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  password: String
})

module.exports = mongoose.model('User', UserSchema)