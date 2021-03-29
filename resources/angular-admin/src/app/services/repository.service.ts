import { AuthService } from '../auth/auth.service';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Story } from '../models/story.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

const storiesUrl = '/api/stories';
const commentsUrl = '/api/comments';
const likesUrl = '/api/likes';
const profilesUrl = '/api/profiles';
const usersUrl = '/api/users';

@Injectable()
export class Repository {
  story: Story;
  stories: Story[];
  profileStories: Story[];
  comments: Comment[];
  profile: User;
  members: User[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
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

  getProfileStories(param: any) {
    let url = `${profilesUrl}/${param}/stories`;
    this.http.get<Story[]>(url).subscribe((s) => (this.profileStories = s));
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
        id: this.authService.currentUser.id,
        username: this.authService.currentUser.username,
      };
      this.stories.push(s);
      this.router.navigateByUrl('/admin/overview');
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
          id: this.authService.currentUser.id,
          username: this.authService.currentUser.username,
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

  getProfile(param: any) {
    this.http.get<User>(`${profilesUrl}/${param}`).subscribe((p) => {
      this.profile = p;
    });
  }

  getMembers() {
    let url = `${usersUrl}`;
    this.http.get<User[]>(url).subscribe((u) => (this.members = u));
  }
}
