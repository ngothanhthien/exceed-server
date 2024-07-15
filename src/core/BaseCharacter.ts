import { Character } from '@/models/Character'
import { CombatEffect } from '@/models/CombatEffect'
import { Effect } from '@/models/effect/Base.Effect.Model'
import { Player } from '@/models/Player'

export abstract class BaseCharacter implements Character {
  gauge: number
  base_powers: CombatEffect
  exceed_powers: Array<CombatEffect | Effect>
  setup(ctx: Player) {
    this.setupDeck(ctx)
  }

  protected abstract setupDeck(ctx: Player): void
}

/**
 * ChildClass
 * Can add setup() {
 *    super.setup()
 *    // do child setup
 * }
 */