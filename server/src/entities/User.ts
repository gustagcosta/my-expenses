import { BaseEntity } from "./BaseEntity"
import { Role } from "./Role"

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
