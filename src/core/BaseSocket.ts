import { Socket } from 'socket.io'
import { Account, accounts } from '@/models/Account'

export class BaseSocket {
  socket: Socket
  account?: Account
  constructor(socket: Socket) {
    this.socket = socket
    this.account = accounts.find(account => account.socket_id === socket.id)
  }
  needAuth() {
    if (!this.account) {
      this.socket.emit('auth:login:need')
      return true
    }

    return false
  }
}
