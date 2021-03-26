import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { Repository } from '../../services/repository.service';
import { Story } from '../../models/story.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  constructor(
    private repo: Repository,
    router: Router,
    activeRoute: ActivatedRoute,
    public userService: UserService
  ) {
    let param = activeRoute.snapshot.params['param'];
    if (param) {
      this.repo.getStory(param);
    } else {
      router.navigateByUrl('/');
    }
  }

  get story(): Story {
    return this.repo.story;
  }

  get comments(): Comment[] {
    return this.repo.comments;
  }

  ngOnInit(): void {}

  like(): void {
    console.log('like');
    this.repo.likeStory(this.story);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
