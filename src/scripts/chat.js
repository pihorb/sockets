import { io } from 'socket.io-client'
const chat = document.querySelector('.chat')
const login = document.querySelector('.login')

const switchElements = () => {
  login.style.display = 'none'
  chat.style.display = 'flex'
}
export const startChat = () => {
  switchElements()
  const isDev = process.env.NODE_ENV === 'development'
  const URL = isDev ? 'http://localhost:3033' : ''
  const socket = io(URL, { autoConnect: false })

  socket.on('connect', () => {
    displayMessage({
      guest: true,
      msg: `You are connected width id: ${socket.id}`,
    })
  })
}
