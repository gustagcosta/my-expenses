import { v4 as uuid } from 'uuid';

export class BaseEntity {
  id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}