import { User } from './user.model';

export class Like {
  constructor(
    public id?: number,
    public user?: User,
    public created_at?: Date,
  ) {}
}
