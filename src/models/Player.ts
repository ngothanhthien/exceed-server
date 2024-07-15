import { BaseModel } from '@/core/BaseModel'
import { Character } from '@/models/Character'
import { CardGroup, Deck, Hand } from '@/models/CardGroup'
import { Account } from '@/models/Account'
import { Card, ForceCost } from '@/models/Card'
import { eventsEmitter } from '@/core/eventEmitter'
import { DECK_DRAW } from '@/constants/self.listener.constant'
import { CardFactory } from '@/factory/card/card.factory'
import { random } from '@/core/random'

export type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export class Player extends BaseModel {
  accountId: number
  character: Character | null
  health: number
  deck: Deck
  hand: Hand
  discard: CardGroup
  gauge: CardGroup
  seal: CardGroup
  hasShuffled: boolean
  handSize: number
  position: Position
  constructor(account: Account) {
    super()
    this.accountId = account.id
    this.health = 30
    this.character = null
    this.deck = new Deck([])
    this.hand = new Hand()
    this.discard = new CardGroup()
    this.gauge = new CardGroup()
    this.seal = new CardGroup()
    this.hasShuffled = false
    this.handSize = 7
  }

  payForce(total: number, costs: ForceCost[]) {
    let paid = 0
    for (const cost of costs) {
      if (paid >= total) {
        break
      }
      const { from, card: name } = cost
      const card = this[from].detail(name) as Card
      paid += card.forceValue()
      this[from].remove(name)
      this.discard.add(card)
    }
  }

  draw(total: number) {
    const clients: Card[] = []
    for (let i = 0; i < total; i++) {
      const card = this.deck.draw(this)
      if (card) {
        this.hand.add(card)
      }
    }
    eventsEmitter.emit(DECK_DRAW, this.accountId, clients, this.deck.length())
  }

  setupDeck(cards: CardData[]) {
    const deck = []
    for (const cardData of cards) {
      const card = CardFactory.create(cardData)
      for (let i = 0; i < cardData.total; i++) {
        deck.push(card)
      }
    }
    random.shuffle(deck)
    this.deck.cards = deck
  }
}
