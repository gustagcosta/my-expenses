import { BaseModel } from "./common/base-model";

export class Bill extends BaseModel {
  description: string;
  expire_date: string;
  value: number;
  user_id: string;

  constructor() {
    super();
  }
}
