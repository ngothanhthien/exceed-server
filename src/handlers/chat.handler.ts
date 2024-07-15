import { Server, Socket } from 'socket.io'
import { CHAT_CREATE, CHAT_LIST } from '@/constants/server-listener'
import { logger } from '@/core/helper'
import { CHAT_CREATED, CHAT_LISTED } from '@/constants/client-listener'
import { chats, Message } from '@/models/Message'

export default (io: Server, socket: Socket) => {
  const list = () => {
    logger({ name: CHAT_LIST, id: socket.id })
    socket.emit(CHAT_LISTED, chats)
  }
  const create = (message: Message) => {
    logger({ name: CHAT_CREATE, id: socket.id, data: message })
    chats.push(message)
    socket.broadcast.emit(CHAT_CREATED, message)
  }

  socket.on(CHAT_LIST, list)
  socket.on(CHAT_CREATE, create)
}
