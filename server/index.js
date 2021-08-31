const express = require('express')
const app = express()
const server = require('http').Server(app)
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3033

const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../dist/index.html')
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

server.listen(PORT, () => `Server is running on port: ${PORT}`)
