import { ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE } from '@/constants/server-listener'
import { errorResponse, logger, successResponse } from '@/core/helper'
import { findRoom, Room, RoomSocket } from '@/models/Room'
import { Server, Socket } from 'socket.io'
import { JsonResponse } from '@/types/response'

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

  socket.on(ROOM_CREATE, createRoom)
  socket.on(ROOM_JOIN, joinRoom)
  socket.on(ROOM_LEAVE, leaveRoom)
}