import { HttpClient, HttpParams } from '@angular/common/http';

import { Comment } from '../models/comment.model';
import { Competition } from '../models/competition.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { Story } from '../models/story.model';
import { ToastService } from './toast.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

const storiesUrl = '/api/stories';
const postsUrl = '/api/posts';
const commentsUrl = '/api/comments';
const likesUrl = '/api/likes';
const profilesUrl = '/api/profiles';
const competitionsUrl = '/api/competitions';

@Injectable()
export class Repository {
  story: Story;
  stories: Story[];
  post: Post;
  posts: Post[];
  profileStories: Story[];
  profileCompetitions: Competition[];
  profileCompetitionsIds: number[];
  comments: Comment[];
  profile: User;
  competitions: Competition[];
  competition: Competition;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
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

  getPost(param: any) {
    this.http.get<Post>(`${postsUrl}/${param}`).subscribe((p) => {
      this.post = p;
      this.getPostComments(p);
    });
  }

  getPosts() {
    let url = `${postsUrl}`;
    this.http.get<Post[]>(url).subscribe((p) => (this.posts = p));
  }

  getProfileStories(param: any) {
    let url = `${profilesUrl}/${param}/stories`;
    this.http.get<Story[]>(url).subscribe((s) => (this.profileStories = s));
  }

  getFeaturedPosts(): Observable<Post[]> {
    let url = `${postsUrl}`;
    let params = new HttpParams().set('featured', 'true');
    return this.http
      .get<Post[]>(url, { params: params })
      .pipe(map((p) => (this.posts = p)));
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

  createStory(s: any): Observable<any> {
    let data = {
      picture: s.picture,
      title: s.title,
      summary: s.summary,
      body: s.body,
    };
    return this.http.post<number>(storiesUrl, data).pipe(
      map((id) => {
        s.id = id;
        s.author = {
          id: this.userService.currentUser.id,
          username: this.userService.currentUser.username,
        };
        this.stories.push(s);
      })
    );
  }

  updateProfile(p: any): Observable<any> {
    let data = {
      picture: p.picture,
      description: p.description,
    };
    return this.http
      .put<any>(`${profilesUrl}/${this.userService.currentUser.id}`, data)
      .pipe(
        map((u) => {
          this.getProfile(u?.id);
          this.userService.currentUser.picture = u?.picture;
          this.userService.currentUser.description = u?.description;
        })
      );
  }

  getComments(s: Story) {
    let url = `${storiesUrl}/${s.id}/comments`;
    this.http.get<Comment[]>(url).subscribe((c) => (this.comments = c));
  }

  getPostComments(p: Post) {
    let url = `${postsUrl}/${p.id}/comments`;
    this.http.get<Comment[]>(url).subscribe((c) => (this.comments = c));
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
      this.showStandardToast('Comment posted');
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
          this.showStandardToast('Story liked');
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

  getCompetitions() {
    let url = `${competitionsUrl}`;
    this.http.get<Competition[]>(url).subscribe((c) => (this.competitions = c));
  }

  getCompetition(param: any) {
    this.http.get<Competition>(`${competitionsUrl}/${param}`).subscribe((c) => {
      this.competition = c;
    });
  }

  enterCompetition(c: Competition): Observable<any> {
    let data = {
      id: c.id,
    };
    return this.http.post<any>(`${competitionsUrl}/${c.id}/enter`, data);
  }

  showStandardToast(message: string) {
    this.toastService.show(message);
  }

  getProfileCompetitions(user: User) {
    let url = `${profilesUrl}/${user.id}/competitions`;
    this.http.get<Competition[]>(url).subscribe((c) => {
      this.profileCompetitions = c;
      this.profileCompetitionsIds = [];
      this.profileCompetitions.forEach((c, index) => {
        this.profileCompetitionsIds[index] = c.id;
      });
    });
  }

  getProfileCompetitions$(user: User): Observable<Competition[]> {
    let url = `${profilesUrl}/${user.id}/competitions`;
    return this.http.get<Competition[]>(url).pipe(
      map((c) => {
        this.profileCompetitions = c;
        this.profileCompetitionsIds = [];
        this.profileCompetitions.forEach((c, index) => {
          this.profileCompetitionsIds[index] = c.id;
        });
        return c;
      })
    );
  }

  getProfileStories$(user: User): Observable<Story[]> {
    let url = `${profilesUrl}/${user.id}/stories`;
    return this.http.get<Story[]>(url).pipe(
      map((s) => {
        this.profileStories = s;
        return s;
      })
    );
  }

  submitCompetionStory(c: Competition, s: Story): Observable<any> {
    let data = {
      competition_id: c.id,
      story_id: s.id,
    };
    return this.http.post<any>(`${competitionsUrl}/${c.id}/submit`, data);
  }
}
