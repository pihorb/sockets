const express = require('express')
const app = express()
const path = require('path')

const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3033

app.use('/', express.static(path.join(__dirname, '../dist')))

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
