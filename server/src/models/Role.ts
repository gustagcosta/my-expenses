import { BaseEntity } from "./BaseEntity";

export class Role extends BaseEntity {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
