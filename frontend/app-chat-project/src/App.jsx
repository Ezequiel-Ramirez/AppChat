import { useState } from 'react'
import './App.css'

import io from 'socket.io-client'

const socket = io('http://localhost:3001', {
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('Connected')
}
)

function App() {
  const [ userName, setUserName ] = useState('')
  const [ room, setRoom ] = useState('')
  
  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room)
    }
  }

  return (
    <>
      Hola mundo
    </>
  )
}

export default App
