// const { SOCKET_EVENTS, ERROR_MESSAGES } = require('../src/utils/constants')
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

io.on('connection', (socket) => {
  console.log(socket, 'connection')
})

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

// io.use((socket, next) => {
//   const users = getAllUsers(io)
//   const username = socket.handshake.auth.username
//   const isUsernameExists = users.some((u) => u.username === username)

//   if (!username) {
//     return next(new Error(ERROR_MESSAGES['INVALID_USERNAME']))
//   }

//   if (isUsernameExists) {
//     return next(new Error(ERROR_MESSAGES['USERNAME_TAKEN']))
//   }

//   socket.username = username
//   next()
// })
