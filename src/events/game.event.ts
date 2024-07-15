import { eventsEmitter } from '@/core/eventEmitter'
import {
  DECISION,
  DECK_AUTO_SHUFFLE,
  DECK_DRAW, GAME_END,
} from '@/constants/self.listener.constant'
import { DecisionEvent } from '@/models/events/decision.event'
import { DECISION_CHOOSE, GAME_PLAYER_SHUFFLE } from '@/constants/client-listener'
import { DECISION_CHOSE } from '@/constants/server-listener'
import { RoomSocket } from '@/socket-models/Room.Socket'
import { Server, Socket } from 'socket.io'
import { Card } from '@/models/Card'

export default (io: Server, socket: Socket) => {
  eventsEmitter.on(DECISION, (decisionEvent: DecisionEvent) => {
    socket.emit(DECISION_CHOOSE, {
      message: decisionEvent.message,
      id: decisionEvent.id
    })
    socket.once(DECISION_CHOSE, decisionEvent.callback)
  })

  eventsEmitter.on(DECK_AUTO_SHUFFLE, (accountId: number) => {
    const roomSocket = new RoomSocket(socket)
    socket.to(roomSocket.room.id.toString()).emit(GAME_PLAYER_SHUFFLE, {
      account_id: accountId,
    })
  })

  eventsEmitter.on(DECK_DRAW, (accountId: number, cards: Card[], remain: number) => {
    const roomSocket = new RoomSocket(socket)
    socket.to(roomSocket.room.id.toString()).emit(GAME_PLAYER_SHUFFLE, {
      account_id: accountId,
      cards: cards.map(card => card.toClient()),
      remain
    })
  })

  eventsEmitter.on(GAME_END, (accountId: number, isWin: boolean, reason: string) => {
    const roomSocket = new RoomSocket(socket)
    socket.to(roomSocket.room.id.toString()).emit('game:end', {
      account_id: accountId,
      win: isWin,
      reason
    })
  })
}