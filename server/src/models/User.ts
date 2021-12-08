import { BaseEntity } from "./BaseEntity";

export class User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role_id: string;

  constructor(name: string, email: string, password: string, role_id: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
    this.role_id = role_id;
  }
}
