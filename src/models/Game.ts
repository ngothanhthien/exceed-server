import { BaseModel } from '@/core/BaseModel'
import { random } from '@/core/random'
import { Account } from '@/models/Account'
import { Player } from '@/models/Player'

export class Game extends BaseModel {
  turn: number
  players: Player[]
  firstPlayer: number
  constructor(accounts: Account[]) {
    super()
    this.turn = 0
    this.players = accounts.map(account => new Player(account))
  }

  setup() {
    this.firstPlayer = random.integer(0, 1)
  }
}
