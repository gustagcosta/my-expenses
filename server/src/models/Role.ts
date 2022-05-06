import { BaseModel } from "./BaseModel";

export class Role extends BaseModel {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
