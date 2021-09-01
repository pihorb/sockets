import { openPage } from './helpers'

const $nickname = document.getElementById('nickname')
const $room = document.getElementById('room-selector')
const $submit = document.getElementById('submit-login')

export const login = () => {
  $nickname.addEventListener('keydown', (e) => {
    if (nickname.value === '') {
      return
    }
    if (e.key === 'Enter') {
      localStorage.setItem('user-name', $nickname.value)
      localStorage.setItem('room', $room.value)
    }
  })

  $room.addEventListener('change', (_) =>
    localStorage.setItem('room', $room.value)
  )

  $submit.addEventListener('click', (_) => {
    if ($nickname.value && $room.value) {
      localStorage.setItem('user-name', $nickname.value)
      localStorage.setItem('room', $room.value)

      openPage('chat')
    }
  })
}
