import { ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE, START_GAME } from '@/constants/server-listener'
import { errorResponse, logger, successResponse } from '@/core/helper'
import { findRoom, Room, rooms } from '@/models/Room'
import { Server, Socket } from 'socket.io'
import { JsonResponse } from '@/types/response'
import { Account, accounts } from '@/models/Account'
import { Game } from '@/models/Game'
import { ROOM_START_GAME } from '@/constants/client-listener'
import { RoomSocket } from '@/socket-models/Room.Socket'

export default (io: Server, socket: Socket) => {
  const createRoom = (callback: (response: JsonResponse) => void) => {
    logger({ name: ROOM_CREATE, id: socket.id })
    const roomSocket = new RoomSocket(socket)
    const newRoom = roomSocket.create() as Room
    callback(successResponse(newRoom.toJson()))
  }

  const joinRoom = (roomId: string, callback: (response: JsonResponse) => void) => {
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
  }

  const leaveRoom = () => {
    logger({ name: ROOM_LEAVE, id: socket.id })
    const roomSocket = new RoomSocket(socket)
    roomSocket.leave()
  }

  const startGame = (callback: (response: JsonResponse) => void) => {
    const sender = accounts.find(account => account.socket_id === socket.id) as Account
    const room = rooms.find(room => room.owner_id === sender.id)
    if (!room) {
      callback(errorResponse('You are not the owner of the room'))
      return
    }
    room.game = new Game(room.accounts)
    socket.broadcast.to(room.id.toString()).emit(ROOM_START_GAME, room.game.toJson())
    callback(successResponse(room.game.toJson()))
  }

  socket.on(ROOM_CREATE, createRoom)
  socket.on(ROOM_JOIN, joinRoom)
  socket.on(ROOM_LEAVE, leaveRoom)
  socket.on(START_GAME, startGame)
}
