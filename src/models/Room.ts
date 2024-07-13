import { generateUniqueId, removeByKeyValue } from '@/core/helper'
import { Account } from '@/models/Account'
import { BaseModel } from '@/core/BaseModel'
import { Socket } from 'socket.io'
import { BaseSocket } from '@/core/BaseSocket'
import { ROOM_UPDATE_STATE } from '@/constants/client-listener'

export const rooms: Room[] = []

export class Room extends BaseModel {
  id: number
  accounts: Account[]
  owner_id: number
  constructor(account: Account) {
    super()
    this.id = generateUniqueId(rooms)
    this.owner_id = account.id
    this.accounts = [account]
    rooms.push(this)
  }
  leave(accountId: number) {
    if (this.accounts.length === 1) {
      return this.destroy()
    }
    removeByKeyValue(this.accounts, 'id', accountId)
    if(this.owner_id === accountId) {
      this.setNewOwner(this.accounts[0].id)
    }
  }
  has(accountId: number) {
    return this.accounts.some(account => account.id === accountId)
  }
  join(account: Account) {
    this.accounts.push(account)
  }
  setNewOwner(accountId: number) {
    this.owner_id = accountId
  }
  destroy() {
    removeByKeyValue(rooms, 'id', this.id)
  }
}

export function findRoom(id: number) {
  return rooms.find(room => room.id === id)
}

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
