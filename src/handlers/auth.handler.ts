import { Server, Socket } from 'socket.io'
import { AUTH_LOGIN } from '@/constants/server-listener'
import { logger, successResponse } from '@/core/helper'
import { getAccount, GuestAccount } from '@/models/Account'
import { AUTH_NEW } from '@/constants/client-listener'
import { JsonResponse } from '@/types/response'

export default (io: Server, socket: Socket) => {
  /**
   * Client login flow
   * 1. Client emit AUTH_LOGIN with username
   * 2. Server check if username is existed
   * 3. If username is existed, server emit AUTH_LOGGED with account data
   * 4. If username is not exist, server create new guest account and emit AUTH_LOGGED with account data
   * 5. Server broadcast AUTH_NEW to notify all clients that new logged in
   */
  const login = (username: string | null, callback: (response: JsonResponse) => void) => {
    logger({ name: AUTH_LOGIN, id: socket.id, data: username })
    let account = username ? getAccount(username) : null
    if (!account) {
      account = new GuestAccount(socket.id)
    } else {
      account.socket_id = socket.id
    }
    callback(successResponse(account.toJson()))
    socket.broadcast.emit(AUTH_NEW, {
      name: account.name,
    })
  }

  socket.on(AUTH_LOGIN, login)
}
