import { Player } from '@/models/Player'
import { Card } from '@/models/Card'
import { CombatEffect } from '@/models/CombatEffect'

export class CombatLog {

}

export class CombatContext {
  player: Player
  is_attacker: boolean
  guard: number
  armor: number
  speed: number
  attack: number | null
  min_range: number | null
  max_range: number | null
  strike_card: Card | null
  extra_effects: Array<CombatEffect>
  stunned: boolean
  hit: boolean
  no_hit: [number, number] | null
  logs: CombatLog[]
  setup() {
    (this.strike_card as Card).setup(this)
    for (const effect of this.extra_effects) {
      if (effect.setup) {
        effect.setup(this)
      }
    }
  }

  resetState() {
    this.guard = 0
    this.armor = 0
    this.speed = 0
    this.attack = null
    this.min_range = null
    this.max_range = null
    this.strike_card = null
    this.extra_effects = []
    this.stunned = false
    this.hit = false
    this.no_hit = null
    this.logs = []
  }
}