import { User } from "./user.model";

export class Story {
  constructor(
    public storyId?: number,
    public title?: string,
    public category?: string,
    public summary?: string,
    public body?: string,
    public likes?: number,
    public author?: User,
    public comments?: Comment[],
    public slug?: string,
    public published?: Date,
    public updated?: Date
  ) {

  }
}
