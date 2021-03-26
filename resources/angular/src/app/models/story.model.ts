import { User } from "./user.model";

export class Story {
  constructor(
    public id?: number,
    public title?: string,
    public summary?: string,
    public body?: string,
    public likes?: number,
    public author?: User,
    public comments?: Comment[],
    public comments_count?: number,
    public slug?: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {

  }
}
