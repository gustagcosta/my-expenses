import { BaseModel } from "./common/base-model";

export class Role extends BaseModel {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
