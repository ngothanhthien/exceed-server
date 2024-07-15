import { CombatEffect } from '@/models/CombatEffect'
import { Effect } from '@/models/effect/Base.Effect.Model'
import { Player } from '@/models/Player'

export interface Character {
  gauge: number
  base_powers: CombatEffect
  exceed_powers: Array<CombatEffect | Effect>
  setup(ctx: Player): void
}
