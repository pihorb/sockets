import '../styles/main.scss'
import { displayMessage, displayAnimation, removeAnimation } from './helpers'
import { login } from './auth'
import { startChat } from './chat'

const user = localStorage.getItem('user-name')
const chatRoom = localStorage.getItem('room')

const initApp = () => (!user || !chatRoom ? login() : startChat())

initApp()

// const chat = document.querySelector('.chat')
// const login = document.querySelector('.login')
// const submitBtn = document.getElementById('submit')

// let userName = ''
// let isTyping = false

// const initSocketIO = () => {
//   socket.on('user-message', ({ message, user, isTyping }) => {
//     const newMessage = `${userName === user ? 'Me' : user}: ${message}`

//     if (message === '') {
//       if (userName !== user) {
//         return isTyping ? displayAnimation(user) : removeAnimation()
//       }
//       return
//     }

//     removeAnimation()
//     displayMessage({ msg: newMessage, guest: userName !== user })
//   })

//   socket.on('user-disconnected', (user) => {
//     displayMessage({ msg: `${user}: left the chat`, guest: true })
//   })

//   return socket
// }

// const addEventListeners = () => {
//   let socket = ''

//   nickNameBtn.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//       chat.style.display = 'flex'
//       login.style.display = 'none'
//       userName = nickNameBtn.value

//       socket.emit('new-user', userName)
//     }
//   })

// submitBtn.addEventListener('keyup', (e) => {
//   if (!isTyping) {
//     socket.emit('message', { message: '', user: userName, isTyping: true })
//     isTyping = true
//   }

//   if ((e.key === 'Enter' && submitBtn.value) || !submitBtn.value) {
//     socket.emit('message', {
//       message: submitBtn.value,
//       user: userName,
//       isTyping: false,
//     })

//     isTyping = false
//     submitBtn.value = ''
//   }
// })
// }
