const io = require('socket.io')(3099, {
  cors: {
    origin: ['http://localhost:8080'],
  },
})

io.on('connection', (socket) => {
  socket.emit(socket.id)

  socket.on('custom-event', ({ message, user }) => {
    socket.userName = user
    io.emit('message', { message, user })
  })

  socket.on('disconnect', () => {
    io.emit('user-disconnected', socket.userName)
  })
})
