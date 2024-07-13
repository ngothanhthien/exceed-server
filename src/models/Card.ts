interface Card {
  id: string
  name: string
  stats: Stats
  cost: number
  doBoost(): void
  doCombatEffect(): void
}