import { Server, Socket } from 'socket.io'
import { CardFactory } from '@/factory/card/card.factory'
import { CombatContext } from '@/models/CombatContext'

export default (io: Server, socket: Socket) => {
  const strike = (cardData: CardData) => {
    const card = CardFactory.createCard(cardData)
    const context = new CombatContext()
  }
}