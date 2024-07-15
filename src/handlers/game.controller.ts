import { Server, Socket } from 'socket.io'
import { eventsEmitter } from '@/core/eventEmitter'
import { AUTO_SHUFFLE, DECISION } from '@/constants/self.listener.constant'
import { DECISION_CHOOSE, GAME_PLAYER_SHUFFLE } from '@/constants/client-listener'
import { DECISION_CHOSE } from '@/constants/server-listener'
import { DecisionEvent } from '@/models/events/decision.event'
import { Player } from '@/models/Player'
import { accounts } from '@/models/Account'
import { RoomSocket } from '@/socket-models/Room.Socket'

interface SelectCharacter {
  characterName: string
  playerName: string
}
interface Decision {
  message: string
  id: string
}
export default (io: Server, socket: Socket) => {
  const characterSelect = (data: SelectCharacter) => {

  }
}