const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
  },
})

const PORT = process.env.PORT || 3033

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

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
