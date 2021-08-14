import { io } from 'socket.io-client'
import './styles/main.css'
const socket = io('http://localhost:3099')

const screen = document.getElementById('screen')

const displayMessage = ({ element, msg, guest }) => {
  const node = document.createElement('DIV')
  const text = document.createTextNode(msg)
  node.appendChild(text)
  node.className = 'message'

  if (guest) {
    node.classList.add('new')
  }

  element.appendChild(node)
}

socket.on('connect', () => {
  console.log(`You are connected width id: ${socket.id}`)
  displayMessage({
    guest: true,
    element: screen,
    msg: `You are connected width id: ${socket.id}`,
  })
})

socket.on('receive-message', (msg) => {
  console.log('Client:', msg)
})

// socket.emit('custom-event', 10)
