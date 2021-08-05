const io = require('socket.io')(3099, {
  cors: {
    origin: ['http://localhost:8080'],
  },
})

io.on('connection', (socket) => {
  console.log(socket.id)
  socket.emit(socket.id)
  socket.on('custom-event', (message) => {
    io.emit('receive-message', message)
  })
})
