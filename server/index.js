const { SOCKET_EVENTS, ERROR_MESSAGES } = require('../src/scripts/constants')
const express = require('express')
const app = express()
const path = require('path')

const server = require('http').Server(app)
const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3033

const CORS = {
  cors: {
    origin: 'http://localhost:8080',
  },
}

const io = require('socket.io')(server, isDev && { ...CORS })
app.use('/', express.static(path.join(__dirname, '../dist')))

const getAllUsers = (io) => {
  const users = []
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    })
  }

  return users
}

io.use((socket, next) => {
  const users = getAllUsers(io)
  const username = socket.handshake.auth.username
  const isUsernameExists = users.some((u) => u.username === username)

  if (!username) {
    return next(new Error(ERROR_MESSAGES['INVALID_USERNAME']))
  }

  if (isUsernameExists) {
    return next(new Error(ERROR_MESSAGES['USERNAME_TAKEN']))
  }

  socket.username = username
  next()
})

io.on(SOCKET_EVENTS['CONNECTION'], (socket) => {
  const users = getAllUsers(io)
  socket.emit(SOCKET_EVENTS['ALL_USERS'], users)

  socket.broadcast.emit(SOCKET_EVENTS['NEW_USER_CONNECTED'], {
    userID: socket.id,
    username: socket.username,
  })
  socket.on(SOCKET_EVENTS['DISCONNECT'], () => {
    io.emit(SOCKET_EVENTS['DISCONNECTED'], socket.username)
  })
})

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
