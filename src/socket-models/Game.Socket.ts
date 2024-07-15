import { Socket } from 'socket.io'
import { Game } from '@/models/Game'
import { RoomSocket } from '@/socket-models/Room.Socket'

export class GameSocket {
  game: Game
  constructor(socket: Socket) {
    const roomSocket = new RoomSocket(socket)
    this.game = roomSocket.room.game as Game
  }
}