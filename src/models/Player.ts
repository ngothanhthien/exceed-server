import { BaseModel } from '@/core/BaseModel'
import { Character } from '@/models/Character'
import { CardGroup, Deck, Hand } from '@/models/CardGroup'

export class Player extends BaseModel {
  id: number
  character: Character | null
  health: number
  deck: Deck | null
  hand: Hand | null
  discard: CardGroup
  gauge: CardGroup
  seal: CardGroup
  hasShuffled: boolean
  constructor(accountId: number) {
    super()
    this.id = accountId
    this.health = 30
    this.character = null
    this.deck = null
    this.hand = null
    this.discard = new CardGroup()
    this.gauge = new CardGroup()
    this.seal = new CardGroup()
    this.hasShuffled = false
  }
}