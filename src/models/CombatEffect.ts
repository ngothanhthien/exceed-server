export interface CombatEffect {
  before(): void
  after(): void
  hit(): void
  cleanUp(): void
  modifier(): void
}