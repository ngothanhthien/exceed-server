import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { accounts, getAccount, GuestAccount } from '@/models/Account'
import { findRoom, Room, rooms, RoomSocket } from '@/models/Room'
import { errorResponse, logger, successResponse } from '@/core/helper'
import { AUTH_LOGIN, CHAT_CREATE, CHAT_LIST, ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE } from '@/constants/server-listener'
import {
  AUTH_LOGGED,
  AUTH_NEW,
  CHAT_CREATED,
  CHAT_LISTED,
} from '@/constants/client-listener'

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
const chats: string[] = []
server.listen(PORT, () => {
  console.log('server running at http://localhost:' + PORT)
})

io.on('connection', (socket) => {
  socket.on(CHAT_LIST, () => {
    logger({ name: CHAT_LIST, id: socket.id })
    socket.emit(CHAT_LISTED, chats)
  })
  socket.on(CHAT_CREATE, (message: string) => {
    logger({ name: CHAT_CREATE, id: socket.id, data: message })
    chats.push(message)
    socket.broadcast.emit(CHAT_CREATED, message)
  })

  /**
   * Client login flow
   * 1. Client emit AUTH_LOGIN with username
   * 2. Server check if username is existed
   * 3. If username is existed, server emit AUTH_LOGGED with account data
   * 4. If username is not exist, server create new guest account and emit AUTH_LOGGED with account data
   * 5. Server broadcast AUTH_NEW to notify all clients that new logged in
   */
  socket.on(AUTH_LOGIN, (username: string | null, callback) => {
    logger({ name: AUTH_LOGIN, id: socket.id, data: username })
    let account = username ? getAccount(username) : null
    if (!account) {
      account = new GuestAccount(socket.id)
    } else {
      account.socket_id = socket.id
    }
    callback(successResponse(account.toJson()))
    socket.broadcast.emit(AUTH_NEW, {
      name: account.name,
    })
  })

  socket.on(ROOM_CREATE, (callback) => {
    logger({ name: ROOM_CREATE, id: socket.id })
    const roomSocket = new RoomSocket(socket)
    const newRoom = roomSocket.create() as Room
    callback(successResponse(newRoom.toJson()))
  })
  socket.on(ROOM_JOIN, (roomId: string, callback) => {
    logger({ name: ROOM_JOIN, id: socket.id, data: roomId })
    const room = findRoom(parseInt(roomId))
    if (!room) {
      callback(errorResponse('Room not found'))
      return
    }
    const roomSocket = new RoomSocket(socket)
    roomSocket.room = room
    const joinedRoom = roomSocket.join() as Room
    callback(successResponse(joinedRoom.toJson()))
  })
  socket.on(ROOM_LEAVE, () => {
    logger({ name: ROOM_LEAVE, id: socket.id })
    const roomSocket = new RoomSocket(socket)
    roomSocket.leave()
  })
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
app.get('/accounts', (req, res) => {
  res.json(accounts.map(account => account.toJson()).map(account => {
    return {
      name: account.name,
    }
  }))
})
app.get('/rooms', (req, res) => {
  res.json(rooms.map(room => room.toJson()))
})
app.get('/room/current', (req, res) => {
  logger({ name: 'GET /room/current', id: 'server', data: req.query })
  const { account_id } = req.query
  if (!account_id) {
    return res.json({})
  }
  const room = rooms.find(room => room.has(parseInt(account_id as string)))
  res.json(room ? room.toJson() : null)
})