import { CombatEffect, ExceedEffect } from '@/models/CombatEffect'
import { CombatContext } from '@/models/CombatContext'
import { AskForForceEffect } from '@/models/effect/AskForForce.effect'
import { Effect } from '@/models/effect/Base.Effect.Model'
import { Player } from '@/models/Player'
import MayCardInfo from '@/database/ss7/may.ss7.database'
import NormalSs7Database from '@/database/ss7/normal.ss7.database'
import { BaseCharacter } from '@/core/BaseCharacter'

export class MayCharacter extends BaseCharacter {
  gauge: 3
  base_powers: CombatEffect
  exceed_powers: Array<CombatEffect | Effect>
  constructor() {
    super()
    this.base_powers = new MayBasePower()
    this.exceed_powers = [new MayExceedPower()]
  }
  setupDeck(ctx: Player) {
    const cards = [
      ...MayCardInfo,
      ...NormalSs7Database
    ]
    ctx.setupDeck(cards)
  }
}

class MayBasePower implements CombatEffect {
  async setup(ctx: CombatContext) {
    const { confirmed, cards } = await AskForForceEffect.run(1, '+1 power')
    if(confirmed) {
      ctx.player.payForce(1, cards)
      ctx.attack = (ctx.attack as number) + 1
    }
  }
}

class MayExceedPower implements ExceedEffect {
  async setup(ctx: CombatContext) {
    if (ctx.is_attacker) {
      const { confirmed, cards } = await AskForForceEffect.run(1, '+2 power')
      if(confirmed) {
        ctx.player.payForce(1, cards)
        ctx.attack = (ctx.attack as number) + 2
      }
    }
  }
  async exceed(ctx: Player) {
    ctx.draw(2)
  }
}

