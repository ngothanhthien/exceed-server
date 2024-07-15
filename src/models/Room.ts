import { generateUniqueId, removeByKeyValue } from '@/core/helper'
import { Account } from '@/models/Account'
import { BaseModel } from '@/core/BaseModel'
import { Socket } from 'socket.io'
import { BaseSocket } from '@/core/BaseSocket'
import { ROOM_UPDATE_STATE } from '@/constants/client-listener'
import { Game } from '@/models/Game'

export const rooms: Room[] = []

export class Room extends BaseModel {
  id: number
  accounts: Account[]
  owner_id: number
  game: Game | null
  constructor(account: Account) {
    super()
    this.id = generateUniqueId(rooms)
    this.owner_id = account.id
    this.accounts = [account]
    this.game = null
    rooms.push(this)
  }
  leave(accountId: number) {
    if (this.accounts.length === 1) {
      return this.destroy()
    }
    removeByKeyValue(this.accounts, 'id', accountId)
    if (this.owner_id === accountId) {
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

