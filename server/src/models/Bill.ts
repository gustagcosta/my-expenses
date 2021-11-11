import { BaseEntity } from "./BaseEntity"

export class Bill extends BaseEntity {
  description: string
  expire_date: Date
  value: number
  user_id: number

  constructor() {
    super()
  }
}
