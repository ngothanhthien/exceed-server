import { CombatContext } from '@/models/CombatContext'

export interface ForceCost {
  from: 'gauge' | 'hand'
  card: string
}

export interface Card {
  name: string
  stats: Stats
  gauge: number
  force: number
  type: 'normal' | 'ultra' | 'special'
  setup(ctx: CombatContext): void
  doBoost(): void
  resolveCombat(): void
  forceValue(): number
  toClient(): string
}

export class BaseCard implements Card {
  name: string
  stats: Stats
  gauge: number
  force: number
  type: 'normal' | 'ultra' | 'special'
  constructor(cardData: CardData) {
    this.stats = new Stats({
      min_range: cardData.min_range,
      max_range: cardData.max_range,
      attack: cardData.attack,
      guard: cardData.guard ?? 0,
      armor: cardData.armor ?? 0,
      speed: cardData.speed,
    })
    this.gauge = cardData.gauge ?? 0
    this.force = cardData.force ?? 0
    this.name = cardData.name
    this.type = cardData.type
  }
  async setup(ctx: CombatContext) {}

  doBoost() {}

  async resolveCombat() {
    await this.before()
    await this.hit()
    await this.after()
    await this.cleanUp()
  }

  forceValue() {
    return this.type === 'ultra' ? 2 : 1
  }

  toClient() {
    return this.name
  }

  protected async before() {}
  protected async hit() {}
  protected async after() {}
  protected async cleanUp() {}
}
