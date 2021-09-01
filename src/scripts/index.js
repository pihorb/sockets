import '../styles/main.scss'
import { openPage } from './helpers'

const user = localStorage.getItem('user-name')
const chatRoom = localStorage.getItem('room')

const initApp = () => openPage(user && chatRoom ? 'chat' : 'login')

initApp()
