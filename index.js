const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb+srv://Music_Meier:${process.env.PASSWORD}@cluster0.xk3ia.mongodb.net/music?retryWrites=true&w=majority`;
const User = require('./models/users');
const Notes = require('./models/notes');
const port = process.env.PORT || 8003;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(console.log('connected to mongoose'))
  .catch(err => console.log(err))

app.post('/notes', (request, response) => {
  const { notes } = request.body
  Notes.create(notes)
    .then(notes => response.send(notes))
    .catch(err => response.send(err))
})

app.post('/users', (request, response) => {
  const { user } = request.body
  User.create(user)
    .then(user => response.send(user))
    .catch(err => response.send(err))
})

app.get('/users', (request, response) => {
  User.find({})
    .then(users => response.send(users))
})

app.get('/notes', (request, response) => {
  Notes.find({})
    .then(notes => response.send(notes))
})

app.listen(port, () => console.log(`listening on port: ${port}`))