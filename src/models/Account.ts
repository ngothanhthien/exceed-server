import { BaseModel } from '@/core/BaseModel'
import { generateUniqueId } from '@/core/helper'
import { random } from '@/core'

export const accounts: GuestAccount[] = []

export interface Account {
  name: string
  id: number
  socket_id: string | null
}

export class GuestAccount extends BaseModel implements Account{
  name: string
  id: number
  socket_id: string | null
  constructor(socketId: string) {
    super()
    this.name = 'Guest-' + random.string(6)
    this.socket_id = socketId
    this.id = generateUniqueId(accounts)
    accounts.push(this)
  }
}

function getAccount(name: string) {
  return accounts.find(account => account.name === name)
}

function currentAccount(id: number) {
  return accounts.find(account => account.id === id)
}

export {
  getAccount,
  currentAccount
}