import { BaseCard } from '@/models/Card'
import { CloseEffect } from '@/models/effect/Close.Effect'

export class AnchorSwing extends BaseCard {
  constructor(cardData: CardData) {
    super(cardData)
  }
  before() {
    CloseEffect.run(1)
  }
}
