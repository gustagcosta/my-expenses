import { BaseEntity } from "./BaseEntity"

export class User extends BaseEntity {
  name: string
  email: string
  password: string

  constructor(name: string, email: string, password: string) {
    super()
    this.name = name
    this.email = email
    this.password = password
  }
}
