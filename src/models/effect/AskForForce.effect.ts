import { eventsEmitter } from '@/core/eventEmitter'
import { DECISION } from '@/constants/self.listener.constant'
import { ForceCost } from '@/models/Card'

export interface AskForForceRequest {
  cards: ForceCost[] // card names
  confirmed: boolean
}
export class AskForForceEffect {
  public static run(total: number, message: string): Promise<AskForForceRequest>
  {
    return new Promise((resolve) => {
      eventsEmitter.emit(DECISION, {
        message: `Pay ${total} force for ${message}`,
        id: 1, // todo: generate id if needed
        callback: (request: AskForForceRequest) => {
          resolve(request)
        },
      })
    })
  }
}