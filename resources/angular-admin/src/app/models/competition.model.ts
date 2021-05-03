import { Story } from "./story.model";

export class Competition {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public fee?: number,
    public reward?: number,
    public competitors_count?: number,
    public slug?: string,
    public deadline?: Date,
    public active?: boolean,
    public created_at?: Date,
    public updated_at?: Date,
    public stories?: Story[]
  ) {

  }
}
