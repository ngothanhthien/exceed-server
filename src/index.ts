import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { accounts } from '@/models/Account'
import { rooms, RoomSocket } from '@/models/Room'
import { logger } from '@/core/helper'
import registerRoomHandler from '@/handlers/room.handler'
import registerAuthHandler from '@/handlers/auth.handler'
import registerChatHandler from '@/handlers/chat.handler'
import { AuthController } from '@/controllers/auth.controller'
import { RoomController } from '@/controllers/room.controller'

const app = express()
const ORIGIN = 'http://localhost:5173'
app.use(express.json())
app.use(
  cors({
    origin: ORIGIN
  })
)
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: ORIGIN
  }
})
const PORT = 5000
server.listen(PORT, () => {
  console.log('server running at http://localhost:' + PORT)
})

io.on('connection', (socket) => {
  registerChatHandler(io, socket)
  registerAuthHandler(io, socket)
  registerRoomHandler(io, socket)
})
io.on('disconnect', (socket) => {
  logger({ name: 'disconnect', id: socket.id })
  const roomSocket = new RoomSocket(socket)
  roomSocket.leave()
})
/**
 * Socket io docs
 * socket.broadcast.emit('event', data)
 * * * Emit an event to all connected clients except the one that triggered the event
 *
 * socket.emit('event', data)
 * * * Emit an event to the client that triggered the event
 *
 * socket.on('request', (arg1, arg2, callback) => {})
 * * * Listen to an event from the client and send a response back to the client
 */

app.get('/', (req, res) => {
  res.json({
    accounts: accounts.map(account => account.toJson()),
    rooms: rooms.map(room => room.toJson()),
  })
})
app.get('/accounts', AuthController.list)

app.get('/rooms', RoomController.list)
app.get('/room/current', RoomController.current)