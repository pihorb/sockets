const screen = document.getElementById('screen')

export const displayMessage = ({ msg, guest = false }) => {
  const node = document.createElement('DIV')
  const text = document.createTextNode(msg)
  node.appendChild(text)
  node.className = 'message'

  if (guest) {
    node.classList.add('new')
  }

  screen.appendChild(node)
}

export const displayAnimation = (user) => {
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
  screen.appendChild(div)
}

export const removeAnimation = () => {
  const animation = document.querySelector('.animation-container')
  return animation && screen.removeChild(animation)
}
