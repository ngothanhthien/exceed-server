import { BaseModel } from '@/core/BaseModel'
import { Account } from '@/models/Account'

export const chats: Message[] = []
export class Message extends BaseModel {
  content: string
  sender: Account
  created_at: Date
  constructor(content: string, sender: Account) {
    super()
    this.content = content
    this.sender = sender
    this.created_at = new Date()
    chats.push(this)
  }
}

export class GlobalMessage extends Message {

}

export class RoomMessage extends Message {
  room_id: number
  constructor(content: string, sender: Account, room_id: number) {
    super(content, sender)
    this.room_id = room_id
  }
}