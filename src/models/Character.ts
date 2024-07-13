import { CombatEffect } from '@/models/CombatEffect'

export interface Character {
  id: string
  name: string
  base_powers: CombatEffect
  exceed_powers: Array<CombatEffect | Effect>
  setup(): void
}