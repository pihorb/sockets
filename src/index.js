// import { io } from 'socket.io-client'

// const socket = io('http://localhost:3099')
import './index.css'

const obj = {
  name: 'Ihor',
  age: 33,
}

console.log({ ...obj, lastName: 'Pylypyak' })
