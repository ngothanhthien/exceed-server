class Stats {
  min_range: number | 'N/A'
  max_range: number | 'N/A'
  attack: number | 'N/A'
  guard: number | 'N/A'
  armor: number | 'N/A'
  speed: number | 'N/A'
  constructor({ min_range, max_range, attack, guard, armor, speed }: Stats) {
    this.min_range = min_range ?? 1
    this.max_range = max_range ?? this.min_range
    this.attack = attack ?? 0
    this.guard = guard ?? 0
    this.armor = armor ?? 0
    this.speed = speed ?? 0
  }
}
