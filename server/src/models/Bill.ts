import { BaseEntity } from "./BaseEntity";

export class Bill extends BaseEntity {
  description: string;
  expire_date: string;
  value: number;
  user_id: string;

  constructor() {
    super();
  }
}
