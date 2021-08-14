import { io } from 'socket.io-client'
import './styles/main.css'

const chat = document.querySelector('.chat')
const login = document.querySelector('.login')

const screen = document.getElementById('screen')
const submitBtn = document.getElementById('submit')
const nickNameBtn = document.getElementById('nickname')

chat.style.display = 'none'

let userName = ''

const displayMessage = ({ msg, guest = false }) => {
  const node = document.createElement('DIV')
  const text = document.createTextNode(msg)
  node.appendChild(text)
  node.className = 'message'

  if (guest) {
    node.classList.add('new')
  }

  screen.appendChild(node)
}

const init = () => {
  const socket = io('http://localhost:3099')

  socket.on('connect', () => {
    displayMessage({
      guest: true,
      msg: `You are connected width id: ${socket.id}`,
    })
  })

  socket.on('message', ({ message, user }) => {
    const newMessage = `${userName === user ? 'Me' : user}: ${message}`
    displayMessage({ msg: newMessage, guest: userName !== user })
  })

  socket.on('user-disconnected', (user) => {
    displayMessage({ msg: `${user}: left the chat`, guest: true })
  })

  submitBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      socket.emit('custom-event', { message: submit.value, user: userName })
      submit.value = ''
    }
  })
}

nickNameBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    chat.style.display = 'flex'
    login.style.display = 'none'
    userName = nickNameBtn.value

    init()
  }
})
