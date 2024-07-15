import { TheWonderfulAndDynamicGoshogawara } from '@/factory/card/ss7-may/TheWonderfulAndDynamicGoshogawara'
import { Totsugekll } from '@/factory/card/ss7-may/Totsugekll'
import { OverheadKiss } from '@/factory/card/ss7-may/OverheadKiss'
import { MrDolphin } from '@/factory/card/ss7-may/MrDolphin'
import { GreatYamadaAttack } from '@/factory/card/ss7-may/GreatYamadaAttack'
import { AnchorSwing } from '@/factory/card/ss7-may/AnchorSwing'
import { Card } from '@/models/Card'
import cardDatabase from '@/database/card.database'

export class CardFactory {
  public static create(cardData: CardData): Card {
    switch (cardData.name) {
      case 'The Wonderful And Dynamic Goshogawara':
        return new TheWonderfulAndDynamicGoshogawara(cardData)
      case 'Totsugekll':
        return new Totsugekll(cardData)
      case 'Overhead Kiss':
        return new OverheadKiss(cardData)
      case 'Mr. Dolphin':
        return new MrDolphin(cardData)
      case 'Great Yamada Attack':
        return new GreatYamadaAttack(cardData)
      case 'Anchor Swing':
        return new AnchorSwing(cardData)
      default:
        throw new Error('Card not found')
    }
  }
  public static createByName(cardName: string): Card {
    const cardData = cardDatabase.find(item => item.name === cardName) as CardData
    return this.create(cardData)
  }
}

