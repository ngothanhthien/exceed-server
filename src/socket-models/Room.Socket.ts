import { BaseSocket } from '@/core/BaseSocket'
import { Socket } from 'socket.io'
import { Account } from '@/models/Account'
import { ROOM_UPDATE_STATE } from '@/constants/client-listener'
import { Room, rooms } from '@/models/Room'

export class RoomSocket extends BaseSocket {
  room: Room
  constructor(socket: Socket) {
    super(socket)
    if (this.account) {
      const account = this.account
      const room = rooms.find(room => room.has(account.id))
      if (room) {
        this.room = room
      }
    }
  }
  leave() {
    if (!this.account) {
      return
    }
    this.room.leave(this.account.id)
    this.notifyUpdate()
    if (this.room.accounts.length === 0) {
      this.socket.leave(this.room.id.toString())
    }
  }
  join() {
    if (this.needAuth()) {
      return
    }
    this.room.join(this.account as Account)

    this.socket.join(this.room.id.toString())
    this.notifyUpdate()
    return this.room
  }
  create() {
    if (this.needAuth()) {
      return
    }
    this.room = new Room(this.account as Account)
    this.socket.join(this.room.id.toString())
    this.notifyUpdate()
    return this.room
  }
  private notifyUpdate() {
    this.socket.broadcast.emit(ROOM_UPDATE_STATE, this.room.toJson())
  }
}
