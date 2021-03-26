import { Comment } from '../models/comment.model';
import { Filter } from '../helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Like } from '../models/like.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Story } from '../models/story.model';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

const storiesUrl = '/api/stories';
const commentsUrl = '/api/comments';
const likesUrl = '/api/likes';

@Injectable()
export class Repository {
  story: Story;
  stories: Story[];
  comments: Comment[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.getStories();
  }

  getStory(param: any) {
    this.http.get<Story>(`${storiesUrl}/${param}`).subscribe((s) => {
      this.story = s;
      this.getComments(s);
    });
  }

  getStories() {
    let url = `${storiesUrl}`;
    this.http.get<Story[]>(url).subscribe((s) => (this.stories = s));
  }

  register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<boolean> {
    return this.http.post<boolean>('/api/account/register', {
      username: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  login(name: string, password: string): Observable<boolean> {
    return this.http.post<boolean>('/api/account/login', {
      name: name,
      password: password,
    });
  }

  logout() {
    this.http.post('/api/account/logout', null).subscribe((response) => {});
  }

  createStory(s: Story) {
    let data = {
      title: s.title,
      summary: s.summary,
      body: s.body,
    };
    this.http.post<number>(storiesUrl, data).subscribe((id) => {
      s.id = id;
      s.author = {
        id: this.userService.currentUser.id,
        username: this.userService.currentUser.username,
      };
      this.stories.push(s);
      this.router.navigateByUrl('/members/overview');
    });
  }

  getComments(s: Story) {
    let url = `${storiesUrl}/${s.id}/comments`;
    this.http.get<Comment[]>(url).subscribe((s) => (this.comments = s));
  }

  createComment(c: any) {
    let data = {
      on_story: c.on_story,
      body: c.body,
    };
    this.http.post<number>(commentsUrl, data).subscribe((id) => {
      c.id = id;
      (c.body = c.body),
        (c.author = {
          id: this.userService.currentUser.id,
          username: this.userService.currentUser.username,
        });
      this.comments.push(c);
      this.story.comments_count++;
    });
  }

  likeStory(s: Story) {
    let data = {
      id: s.id,
    };
    this.http.post<any>(`${likesUrl}/stories/${s.id}`, data).subscribe(
      (data) => {
        if (data?.liked) {
          this.story.likes_count++;
        }
      },
      (err) => console.error(err)
    );
  }

  deleteStory(id: number) {
    this.http.delete(`${storiesUrl}/${id}`).subscribe(() => this.getStories());
  }
}
