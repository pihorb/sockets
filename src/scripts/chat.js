import { io } from 'socket.io-client'
import { SOCKET_EVENTS, ERROR_MESSAGES } from './constants'
import { openPage, addUserToMenu } from './helpers'

export const initSocketConnection = () => {
  const username = localStorage.getItem('user-name')
  const isDev = process.env.NODE_ENV === 'development'
  const URL = isDev ? 'http://localhost:3033' : ''
  const socket = io(URL, { autoConnect: false })
  let users = []

  socket.auth = { username }
  socket.connect()

  socket.on(ERROR_MESSAGES['CONNECT_ERROR'], (err) => {
    if (err.message === ERROR_MESSAGES['USERNAME_TAKEN']) {
      return openPage('login')
    }
  })

  socket.on(SOCKET_EVENTS['ALL_USERS'], (arr) => {
    users = [...new Set([...users, ...arr])]
    users.map((user) =>
      addUserToMenu({ ...user, self: username === user.username })
    )
  })

  socket.on(SOCKET_EVENTS['NEW_USER_CONNECTED'], (user) => {
    const isExistedUser = users.some((u) => u.username === user.username)

    if (!isExistedUser) {
      addUserToMenu({ ...user, self: username === user.username })
    }

    users = [...new Set([...users, user])]
  })

  socket.on('connect', () => console.log('connected'))
  socket.on(SOCKET_EVENTS['DISCONNECTED'], (username) =>
    console.log('disconnected', username)
  )
}
