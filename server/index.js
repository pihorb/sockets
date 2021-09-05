const {
  userJoin,
  getAllUsers,
  userLeft,
  getCurrentUser,
} = require('../src/utils/helpers')
const { SOCKET_EVENTS } = require('../src/utils/constants')
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

io.on(SOCKET_EVENTS['CONNECTION'], (socket) => {
  socket.on(SOCKET_EVENTS['USER_JOIN'], ({ username, room }, cb) => {
    const user = userJoin({ username, room, id: socket.id })

    cb('Admin', `${user.username}, welcome to chat!`)
    socket.join(room)

    socket.broadcast.to(user.room).emit(SOCKET_EVENTS['MESSAGE'], {
      user: user.username,
      msg: `${user.username} has joined the chat`,
    })

    io.to(user.room).emit(SOCKET_EVENTS['ALL_USERS'], {
      room: user.room,
      users: getAllUsers(user.room),
    })
  })

  socket.on(SOCKET_EVENTS['CHAT_MESSAGE'], (msg) => {
    const user = getCurrentUser(socket.id)

    if (user) {
      io.to(user.room).emit(SOCKET_EVENTS['MESSAGE'], {
        user: user.username,
        msg,
      })
    }
  })

  socket.on(SOCKET_EVENTS['DISCONNECT'], () => {
    const user = userLeft(socket.id)

    if (user) {
      socket.broadcast.to(user.room).emit(SOCKET_EVENTS['MESSAGE'], {
        user: user.username,
        msg: `${user.username} has left the chat`,
      })

      io.to(user.room).emit(SOCKET_EVENTS['ALL_USERS'], {
        room: user.room,
        users: getAllUsers(user.room),
      })
    }
  })
})

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
