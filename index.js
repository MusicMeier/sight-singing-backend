const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv');
const router = express.Router();
const cors = require('cors');

dotenv.config({path: './config/config.env'})

connectDB();

const app = express();
app.use(express.json())
app.use(cors());

const auth = require('./routes/auth.routes')
app.use("/api/auth", auth)

app.get('/', (request, response) => {
  response.send('Hello Coders!')
})

const bodyParser= require('body-parser');

const Notes = require('./models/notes');
const port = process.env.PORT || 8003;

app.use(bodyParser.json());
const multer = require('multer');
const upload = multer({dest: 'uploads/'})

// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
// const uri = `mongodb+srv://Music_Meier:${process.env.PASSWORD}@cluster0.xk3ia.mongodb.net/music?retryWrites=true&w=majority`;
// const userSchema = require('./models/users');
// const users = require('./models/users');


app.post('/notes', (request, response) => {
  const { notes } = request.body
  Notes.create(notes)
    .then(notes => response.send(notes))
    .catch(err => response.send(err))
})

app.post('/recordings', upload.single('file'), (request, response, next) => {
  console.log(request.file)
  response.sendStatus(201)
})



// app.post('/users', (request, response) => {
//   const { user } = request.body
//   userSchema.create(user)
//     .then(user => response.send(user))
//     .catch(err => response.send(err))
// })

app.get('/users', (request, response) => {
  User.find({})
    .then(users => response.send(users))
})

app.get('/notes', (request, response) => {
  Notes.find({})
    .then(notes => response.send(notes))
})

app.listen(port, () => console.log(`listening on port: ${port}`))