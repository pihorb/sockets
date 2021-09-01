import { login } from './auth'
import { initSocketConnection } from './chat'

const pages = {
  login: document.querySelector('.login'),
  chat: document.querySelector('.chat'),
}
const $screen = document.getElementById('screen')

export const openPage = (pageToOpen) => {
  for (const page in pages) {
    pages[page].classList.remove('show')
  }

  pages[pageToOpen].classList.add('show')

  if (pageToOpen === 'login') {
    login()
  }

  if (pageToOpen === 'chat') {
    initSocketConnection()
  }
}

const addUserToMenu = ({ username, self }) => {
  const $list = document.querySelector('.chat__list')
  const user = document.createElement('li')
  user.className = 'chat__user'
  user.innerHTML = `<span>${username}</span>`

  if (self) {
    user.innerHTML += `<span>(yourself)</span>`
  }
  $list.appendChild(user)
}

const displayAnimation = (user) => {
  const div = document.createElement('DIV')

  const holder = div.cloneNode(true)
  const span = document.createElement('SPAN')

  holder.id = 'typing-indicator'
  div.className = 'animation-container'
  div.textContent = `${user}: `

  div.appendChild(holder)
  for (let i = 0; i < 3; i++) {
    holder.appendChild(span.cloneNode(true))
  }
  $screen.appendChild(div)
}

const removeAnimation = () => {
  const animation = document.querySelector('.animation-container')
  return animation && $screen.removeChild(animation)
}

export { removeAnimation, displayAnimation, addUserToMenu }
