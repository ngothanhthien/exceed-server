import { BaseModel } from '@/core/BaseModel'
import { random } from '@/core'

export class Game extends BaseModel {
  turn: number
  players: number[]
  firstPlayer: number
  constructor() {
    super()
    this.turn = 0
    this.firstPlayer = random.integer(0, 1)
  }
}