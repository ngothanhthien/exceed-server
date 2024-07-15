import { removeByKeyValue } from '@/core/helper'
import { random } from '@/core/random'
import { Card } from '@/models/Card'
import { eventsEmitter } from '@/core/eventEmitter'
import { DECK_AUTO_SHUFFLE } from '@/constants/self.listener.constant'
import { Player } from '@/models/Player'

class CardGroup {
  cards: Card[]
  constructor() {
    this.cards = []
  }
  remove(cardName: string) {
    return removeByKeyValue(this.cards, 'name', cardName)
  }
  add(card: Card) {
    this.cards.push(card)
  }
  detail(name: string) {
    return this.cards.find(item => item.name === name)
  }
  get() {
    return this.cards.slice() // return a copy
  }
  length() {
    return this.cards.length
  }
  clear() {
    this.cards = []
  }
  forceValue() {

  }
}

class Hand extends CardGroup {
  constructor() {
    super()
  }
  randomRemove() {
    const rNumber = random.integer(0, this.cards.length - 1)
    const card = this.cards[rNumber]
    this.cards.splice(rNumber, 1)
    return card
  }
}

class Deck extends CardGroup {
  constructor(init: Card[]) {
    super()
    this.cards = init
  }
  shuffle() {
    random.shuffle(this.cards)
  }
  draw(ctx: Player) {
    if (this.cards.length === 0) {
      if (ctx.hasShuffled) {
        eventsEmitter.emit('game:end', ctx.accountId, false, 'Deck is empty')
        return
      }
      this.shuffle()
      ctx.hasShuffled = true
      eventsEmitter.emit(DECK_AUTO_SHUFFLE, ctx.accountId)
    }
    return this.cards.pop()
  }
}

export { Hand, Deck, CardGroup }
