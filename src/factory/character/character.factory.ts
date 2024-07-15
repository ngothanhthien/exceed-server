import { Character } from '@/models/Character'
import { MayCharacter } from '@/factory/character/ss7/May.character'

export class CharacterFactory {
  public static create(name: string): Character {
    switch (name) {
      case 'May':
        return new MayCharacter()
      default:
        throw new Error('Character not found')
    }
  }
}