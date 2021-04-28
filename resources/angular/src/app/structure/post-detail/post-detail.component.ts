import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
import { Repository } from '../../services/repository.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  constructor(
    private repo: Repository,
    router: Router,
    activeRoute: ActivatedRoute,
    public userService: UserService
  ) {
    let param = activeRoute.snapshot.params['param'];
    if (param) {
      this.repo.getPost(param);
    } else {
      router.navigateByUrl('/');
    }
  }

  get post(): Post {
    return this.repo.post;
  }

  get comments(): Comment[] {
    return this.repo.comments;
  }

  ngOnInit(): void {}

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
