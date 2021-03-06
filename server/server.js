import express from 'express'
import cookieParser from 'cookie-parser'
import favicon from 'serve-favicon'
import io from 'socket.io'

import config from './config'
import mongooseService from './services/mongoose'

import Html from '../client/html'

const { resolve } = require('path')

const server = express()

const PORT = config.port

const middleware = [
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist')),
  favicon(`${__dirname}/public/favicon.ico`)
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

// MongoDB
if (config.mongoEnabled) {
  console.log('MongoDB Enabled: ', config.mongoEnabled)
  mongooseService.connect()
}

// SocketsIO
if (config.socketsEnabled) {
  console.log('Sockets Enabled: ', config.socketsEnabled)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

server.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
