import { useState } from 'react'
import './App.css'
import { Container, Card, Form, Button } from 'semantic-ui-react'

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
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <Container>
      {!showChat ? (
        <Card fluid>
          <Card.Content header='Unirme al chat' />
          <Card.Content>
            <Form>
              <Form.Field>
                <label>Nombre</label>
                <input type="text" placeholder="Name..." onChange={(e) => { setUserName(e.target.value) }} />
              </Form.Field>
              <Form.Field>
                <label>Sala:</label>
                <input type="text" placeholder="Room..." onChange={(e) => { setRoom(e.target.value) }} />
              </Form.Field>
              <Button onClick={joinRoom}>Join A Room</Button>
            </Form>
          </Card.Content>
        </Card>
      ) : (
        <Container>
          <Chat socket={socket} username={userName} room={room} />
        </Container>
      )}
    </Container>
  )
}

export default App
