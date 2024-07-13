import { removeByKeyValue } from '@/core/helper'
import { random } from '@/core'

class CardGroup {
  cards: Card[]
  constructor() {
    this.cards = []
  }
  remove(card: Card) {
    removeByKeyValue(this.cards, 'id', card.id)
  }
  add(card: Card) {
    this.cards.push(card)
  }
  detail(card: Card) {
    return this.cards.find((item) => item.id === card.id)
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
  draw() {
    return this.cards.pop()
  }
}

export { Hand, Deck, CardGroup }