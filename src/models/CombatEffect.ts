import { CombatContext } from '@/models/CombatContext'
import { Player } from '@/models/Player'

export interface CombatEffect {
  before?(): Promise<void>
  after?(): Promise<void>
  hit?(): Promise<void>
  cleanUp?(): Promise<void>
  setup?(ctx: CombatContext): Promise<void>
}

export interface ExceedEffect extends CombatEffect {
  exceed(ctx: Player): Promise<void>
}