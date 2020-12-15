const express = require('express')
const bodyParser= require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())

const connectionString = `mongodb+srv://Music_Meier:${process.env.PASSWORD}@cluster0.xk3ia.mongodb.net/music-note-frequencies?retryWrites=true&w=majority`;

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('music-note-frequencies')
    const notesCollection = db.collection('notes')
    app.post('/notes', (request, response) => {
      notesCollection.insertOne(request.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    })
    // db.collection('notes').insertMany([
    //   {note: 'C', frequencies: numbers.map(number => number * 16.35), baseFrequency: 16.35},
    //   {note: 'C sharp', frequencies: numbers.map(number => number * 17.32), baseFrequency: 17.32},
    //   {note: 'D flat', frequencies: numbers.map(number => number * 17.32), baseFrequency: 17.32},
    //   {note: 'D', frequencies: numbers.map(number => number * 18.35), baseFrequency: 18.35},
    //   {note: 'D sharp', frequencies: numbers.map(number => number * 19.45), baseFrequency: 19.45},
    //   {note: 'E flat', frequencies: numbers.map(number => number * 19.45), baseFrequency: 19.45},
    //   {note: 'E', frequencies: numbers.map(number => number * 20.60), baseFrequency: 20.60},
    //   {note: 'F', frequencies: numbers.map(number => number * 21.83), baseFrequency: 21.83},
    //   {note: 'F sharp', frequencies: numbers.map(number => number * 23.12), baseFrequency: 23.12},
    //   {note: 'G flat', frequencies: numbers.map(number => number * 23.12), baseFrequency: 23.12},
    //   {note: 'G', frequencies: numbers.map(number => number * 24.50), baseFrequency: 24.50},
    //   {note: 'G sharp', frequencies: numbers.map(number => number * 25.96), baseFrequency: 25.96},
    //   {note: 'A flat', frequencies: numbers.map(number => number * 25.96), baseFrequency: 25.96},
    //   {note: 'A', frequencies: numbers.map(number => number * 27.50), baseFrequency: 27.50},
    //   {note: 'A sharp', frequencies: numbers.map(number => number * 29.14), baseFrequency: 29.14},
    //   {note: 'B flat', frequencies: numbers.map(number => number * 29.14), baseFrequency: 29.14},
    //   {note: 'B', frequencies: numbers.map(number => number * 30.87), baseFrequency: 30.87}
    // ])
    app.get('/notes', (request, response) => {
      response.json({notes})
    })
  })


app.listen(8001)