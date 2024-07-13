import { accounts } from '@/models/Account'

export class AuthController {
  public static async list(req: any, res: any) {
    res.json(accounts.map(account => account.toJson()).map(account => {
      return {
        name: account.name,
      }
    }))
  }
}