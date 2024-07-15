import { BaseSocket } from '@/core/BaseSocket'
import { Socket } from 'socket.io'
import { Player } from '@/models/Player'
import { Room, rooms } from '@/models/Room'
import { Account } from '@/models/Account'
import { Game } from '@/models/Game'

export class PlayerSocket extends BaseSocket {
  player: Player
  constructor(socket: Socket) {
    super(socket)
    const account = this.account as Account
    const room = rooms.find(room => room.has(account.id)) as Room
    const game = room.game as Game
    this.player = game.players.find(player => player.accountId === account.id) as Player
  }
}