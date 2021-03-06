import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/models/post.model';
import { Repository } from 'src/app/services/repository.service';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  featuredPost: Post;
  constructor(private repo: Repository) {}

  ngOnInit(): void {
    this.repo.getFeaturedPosts().subscribe((posts)=>{
      this.featuredPost = posts[0];
    });
    this.repo.getLimitedStories(3);
  }

  get posts(): Post[] {
    return this.repo.posts?.slice(1);
  }

  get stories(): Story[] {
    return this.repo.stories;
  }
}
