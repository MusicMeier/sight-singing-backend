const express = require('express');
const app = express();
const router = express.Router();

const cors = require('cors');

const bodyParser= require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
require('dotenv').config();
const uri = `mongodb+srv://Music_Meier:${process.env.PASSWORD}@cluster0.xk3ia.mongodb.net/music?retryWrites=true&w=majority`;
const userSchema = require('./models/users');
// const users = require('./models/users');
const Notes = require('./models/notes');
const port = process.env.PORT || 8003;

app.use(bodyParser.json());
const multer = require('multer');
const upload = multer({dest: 'uploads/'})
app.use(cors());

mongoose.connect(uri, { 
  useNewUrlParser: true,
  useCreateIndex: true,
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

app.post('/recordings', upload.single('file'), (request, response, next) => {
  console.log(request.file)
  response.sendStatus(201)
})

router.post('/signin-user', (request, response, next) => {
  let getUser;
  userSchema.findOne({
    email: request.body.email
  }).then(user => {
    if (!user) {
      return request.status(401).json({
        message: "Auth Failed"
      })
    }
    getUser = user;
    return bcrypt.compare(request.body.password, user.password)
  })
    .then(response => {
      if (!response) {
        return response.status(401).json({
          message: "Auth Failed"
        });     
      }
      let jwtToken = jwt.sign({
        email: getUser.email,
        userId: getUser._id
      }, "longer-secret-is-better", {
        expiry: "1h"
      });
      response.status(200).json({
        token: jwtToken,
        expiresIn: 6600,
        msg: getUser
      });
    })
    .catch(err => {
      return reqponse.status(410).json({
        message: 'Auth fail'
      });
    });
});

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