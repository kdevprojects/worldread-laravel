import { AuthService } from '../auth/auth.service';
import { Comment } from '../models/comment.model';
import { Competition } from '../models/competition.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { Story } from '../models/story.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

const storiesUrl = '/api/stories';
const postsUrl = '/api/posts';
const commentsUrl = '/api/comments';
const likesUrl = '/api/likes';
const profilesUrl = '/api/profiles';
const usersUrl = '/api/users';
const competitionsUrl = '/api/competitions';

@Injectable()
export class Repository {
  story: Story;
  stories: Story[];
  post: Post;
  posts: Post[];
  profileStories: Story[];
  comments: Comment[];
  profile: User;
  members: User[];
  competitions: Competition[];
  results: Competition[];

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

  getPost(param: any) {
    this.http.get<Post>(`${postsUrl}/${param}`).subscribe((p) => {
      this.post = p;
    });
  }

  getPosts() {
    let url = `${postsUrl}`;
    this.http.get<Post[]>(url).subscribe((p) => (this.posts = p));
  }

  getAllPosts() {
    let url = `${postsUrl}/all`;
    this.http.get<Post[]>(url).subscribe((p) => (this.posts = p));
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

  getCompetitions() {
    let url = `${competitionsUrl}`;
    this.http.get<Competition[]>(url).subscribe((c) => (this.competitions = c));
  }

  createCompetition(c: any): Observable<any> {
    let data = {
      name: c.name,
      description: c.description,
      fee: c.fee,
      reward: c.reward,
      deadline: c.deadline,
      picture: c.picture,
    };
    return this.http.post<number>(competitionsUrl, data).pipe(
      map((id) => {
        this.competitions.push(c);
      })
    );
  }

  createPost(p: any): Observable<any> {
    let data = {
      body: p.body,
      summary: p.summary,
      title: p.title,
      picture: p.picture,
    };
    return this.http.post<number>(postsUrl, data).pipe(
      map((id) => {
        this.posts.push(p);
      })
    );
  }

  updatePost(p: any): Observable<any> {
    let data = {
      body: p.body,
      summary: p.summary,
      title: p.title,
      active: p.active,
      featured: p.featured,
      picture: p.picture,
    };
    return this.http
      .put<any>(`${postsUrl}/${p.id}`, data)
      .pipe(
        map((u) => {
          this.getPost(u?.id);
        })
      );
  }

  getResults() {
    let url = `${competitionsUrl}/results`;
    this.http.get<Competition[]>(url).subscribe((r) => (this.results = r));
  }

getPostAsync(param: any): Observable<Post> {
    return this.http.get<Post>(`${postsUrl}/${param}`).pipe(map((p) => {
      this.post = p;
      return p;
    }));
  }

  clearPost() {
    this.post = null;
  }
}
