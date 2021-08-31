import { startChat } from './chat'

const nickname = document.getElementById('nickname')
const room = document.getElementById('room-selector')
const submit = document.getElementById('submit-login')

export const login = () => {
  const user = localStorage.getItem('user-name')
  const chatRoom = localStorage.getItem('room')

  nickname.addEventListener('keydown', (e) => {
    if (nickname.value === '') {
      return
    }
    if (e.key === 'Enter') {
      if (!user) {
        localStorage.setItem('user-name', nickname.value)
      }
      if (!chatRoom) {
        localStorage.setItem('room', room.value)
      }
    }
  })

  room.addEventListener('change', (_) =>
    localStorag_.setItem('room', room.value)
  )

  submit.addEventListener('click', (_) => {
    if (user && chatRoom) {
      startChat()
    }
  })
}
