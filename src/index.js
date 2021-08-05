import { io } from 'socket.io-client'
const socket = io('http://localhost:3099')

socket.on('connect', () => {
  console.log(`You are connected width id: ${socket.id}`)
})

socket.on('receive-message', (msg) => {
  // console.log(msg)
})

socket.emit('custom-event', 10)
