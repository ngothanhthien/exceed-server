interface CardData {
  name: string
  min_range: number | 'N/A'
  max_range: number | 'N/A'
  speed: number
  attack: number
  guard?: number
  armor?: number
  description_1: string
  description_2: string
  gauge?: number
  force?: number
  type: 'normal' | 'special' | 'ultra'
  total: number
}
