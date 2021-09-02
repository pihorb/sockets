import './styles/main.scss'
import { io } from 'socket.io-client'

const isDev = process.env.NODE_ENV === 'development'

const URL = isDev ? 'http://localhost:3033' : ''
const socket = io(URL, { autoConnect: false }).connect()
