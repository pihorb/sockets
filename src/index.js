import './styles/main.scss'
import { io } from 'socket.io-client'
import qs from 'query-string'
import { SOCKET_EVENTS } from './utils/constants'

const query = qs.parse(window.location.search)
const isDev = process.env.NODE_ENV === 'development'
const URL = isDev ? 'http://localhost:3033' : ''
const socket = io(URL, { autoConnect: false })

const $room = document.querySelector('.chat__room')
const $list = document.querySelector('.chat__list')
const $leave = document.querySelector('.chat__leave')
const $interface = document.querySelector('.chat__interface')
const $submitForm = document.querySelector('#chat-form')

const renderMessage = (user, msg) => {
  const time = new Date().toLocaleString().split(',')[1].trim()
  const message = document.createElement('div')
  message.classList.add('chat__message')
  message.innerHTML = `
  <div class="chat__message-info"><span>${user}</span><span>${time}</span></div>
  <div class="chat__message-text">${msg}</div>
  `
  $interface.appendChild(message)
}

const renderUsersList = (users) => {
  //Clear list
  $list.innerHTML = ''

  //Add updated list
  users.forEach((user) => {
    const item = document.createElement('li')
    item.classList.add('chat__user')
    item.textContent = user.username
    $list.appendChild(item)
  })
}

const renderRoom = (room) => {
  $room.innerHTML = room
}

const leavePage = () => window.location.replace('index.html')

if (query.username && query.room) {
  socket.connect()
  socket.emit(
    SOCKET_EVENTS['USER_JOIN'],
    {
      username: query.username,
      room: query.room,
    },
    renderMessage
  )

  socket.on(SOCKET_EVENTS['MESSAGE'], ({ user, msg }) => {
    renderMessage(user, msg)
    $interface.scrollTop = $interface.scrollHeight
  })

  socket.on(SOCKET_EVENTS['ALL_USERS'], ({ users, room }) => {
    renderRoom(room)
    renderUsersList(users)
  })

  $submitForm.addEventListener('submit', (e) => {
    e.preventDefault()

    socket.emit(SOCKET_EVENTS['CHAT_MESSAGE'], e.target.message.value.trim())

    e.target.message.value = ''
  })
}

$leave?.addEventListener('click', () => leavePage())
