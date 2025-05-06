import { BaseModel } from "./base-model";

export class Genre extends BaseModel {
  static get tableName() {
    return "genres";
  }
  name!: string;
}
