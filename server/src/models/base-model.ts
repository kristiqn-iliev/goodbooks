import { Model } from "objection";

export abstract class BaseModel extends Model {
  id!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
