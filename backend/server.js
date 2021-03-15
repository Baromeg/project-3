const express = require('express')
const expressServer = express()
const { port, dbURI } = require('./config/environment')
require('dotenv').config()
const Router = require('./router')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const dist = path.join(__dirname, 'dist')

// For environment varibles
// console.log(process.env.hello)

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    // * err -> tells you why you can't connect if you fail to connect
    if (err) console.log(err)
    else console.log('Mongoose connected successfully!')
  }
)

expressServer.use((req, res, next) => {
  console.log(`Incoming request, ${req.method} to ${req.url}`)
  next()
})

expressServer.use(bodyParser.json())

expressServer.use('/api', Router)

expressServer.use('/', express.static(dist))

expressServer.get('*', function (req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

// We can give it whichever port we like, but it must be unique!
expressServer.listen(port)
