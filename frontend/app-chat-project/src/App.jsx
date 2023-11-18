import { useState } from 'react'
import './App.css'

import io from 'socket.io-client'
import Chat from './Chat'

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
      <div className="chat">
      <h3>Unirme al chat</h3>
        <input type="text" placeholder="Name..." onChange={(e) => { setUserName(e.target.value) }} />
        <input type="text" placeholder="Room..." onChange={(e) => { setRoom(e.target.value) }} />
        <button onClick={joinRoom}>Join A Room</button>
        <Chat socket={socket} username={userName} room={room} />
      </div>
    </>
  )
}

export default App
