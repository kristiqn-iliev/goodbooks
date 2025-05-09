import { Transaction } from "objection";
import { Genre } from "../models/genre";

export class GenreService {
  async create(name: string, trx?: Transaction) {
    return Genre.query(trx).insert({ name: name }).into("genres");
  }

  async findByName(name: string, trx?: Transaction) {
    return Genre.query(trx).where("name", name).first();
  }

  async findOrCreate(name: string, trx?: Transaction) {
    const existing = await this.findByName(name, trx);
    return existing ?? (await this.create(name, trx));
  }
}
