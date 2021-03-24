import { Filter } from '../helper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Story } from '../models/story.model';
import { UserService } from './user.service';

const storiesUrl = '/api/stories';

@Injectable()
export class Repository {
  story: Story;
  stories: Story[];
  filter: Filter = new Filter();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.filter.category = '';
    this.filter.related = false;
    this.getStories();
  }

  getStory(id: number) {
    this.http
      .get<Story>(`${storiesUrl}/${id}`)
      .subscribe((s) => (this.story = s));
  }

  getStories() {
    let url = `${storiesUrl}?related=${this.filter.related}`;
    if (this.filter.category) {
      url += `&category=${this.filter.category}`;
    }
    if (this.filter.search) {
      url += `&search=${this.filter.search}`;
    }
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
        id: this.userService.getCurrentUser().id,
        username: this.userService.getCurrentUser().username,
      };
      this.stories.push(s);
      this.router.navigateByUrl('/members/overview');
    });
  }

  deleteStory(id: number) {
    this.http.delete(`${storiesUrl}/${id}`).subscribe(() => this.getStories());
  }
}
