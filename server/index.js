const express = require('express')
const app = express()

app.use(express.static(__dirname + '../dist'))

const io = require('socket.io')(3099, {
  cors: {
    origin: ['http://localhost:8080'],
  },
})

io.on('connection', (socket) => {
  socket.emit(socket.id)

  socket.on('new-user', (user) => {
    socket.userName = user
  })

  socket.on('message', ({ message, user, isTyping }) => {
    io.emit('user-message', { message, user, isTyping })
  })

  socket.on('disconnect', () => {
    io.emit('user-disconnected', socket.userName)
  })
})
