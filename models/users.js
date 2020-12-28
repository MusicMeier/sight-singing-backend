const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
},
{
  collection: 'users'
})

UserSchema.plugin(uniqueValidator, { message: 'Email already exists' });
module.exports = mongoose.model('User', UserSchema)