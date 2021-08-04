const io = require('socket.io')(3099)

io.on('connection', (socket) => {
  socket.emit(socket.id)
})
