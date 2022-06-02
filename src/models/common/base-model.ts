import { v4 as uuid } from "uuid";

export class BaseModel {
  id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
