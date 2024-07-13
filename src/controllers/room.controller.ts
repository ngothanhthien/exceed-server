import { rooms } from '@/models/Room'
import { logger } from '@/core/helper'

export class RoomController {
  public static async list(req: any, res: any) {
    logger({ name: 'GET /rooms', id: 'server' })
    res.json(rooms.map(room => room.toJson()))
  }

  public static current(req: any, res: any) {
    logger({ name: 'GET /room/current', id: 'server', data: req.query })
    const { account_id } = req.query
    if (!account_id) {
      return res.json({})
    }
    const room = rooms.find(room => room.has(parseInt(account_id as string)))
    res.json(room ? room.toJson() : null)
  }
}