import { GuestAccount } from '@/models/Account'
import { Random } from 'random-js'

function main() {
  const random = new Random()
  const a = [1, 2, 3, 4, 5]
  shuffle(a)
  console.log(a)
}

function shuffle(array: Array<string | number>) {
  const random = new Random()
  random.shuffle(array)
}

main()
