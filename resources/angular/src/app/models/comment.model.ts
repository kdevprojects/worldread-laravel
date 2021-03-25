import { Story } from './story.model';
import { User } from './user.model';

export class Comment {
  constructor(
    public id?: number,
    public on_story?: Story,
    public body?: string,
    public from_user?: User,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
