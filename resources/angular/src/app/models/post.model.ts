import { User } from "./user.model";

export class Post {
  constructor(
    public id?: number,
    public picture?: string,
    public title?: string,
    public summary?: string,
    public body?: string,
    public author?: User,
    public comments?: Comment[],
    public comments_count?: number,
    public slug?: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {

  }
}
