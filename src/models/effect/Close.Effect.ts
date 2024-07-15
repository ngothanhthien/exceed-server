import { Player, Position } from '@/models/Player'

export class CloseEffect {
  public static run(total: number, ctx: Player, opponent: Player) {
    const origin = ctx.position
    const target = opponent.position
    const diff = Math.abs(origin - target)
    if (diff <= 1) {
      return origin
    }

    const direction = origin > target ? -1 : 1
    if (diff <= total) { // closest to target
      ctx.position = (target - direction) as Position
      return ctx.position
    }

    ctx.position = (origin + direction * total) as Position
    return ctx.position
  }
}