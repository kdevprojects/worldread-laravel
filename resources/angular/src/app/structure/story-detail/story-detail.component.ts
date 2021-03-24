import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Repository } from '../../services/repository.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss'],
})
export class StoryDetailComponent implements OnInit {
  constructor(
    private repo: Repository,
    router: Router,
    activeRoute: ActivatedRoute
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

  ngOnInit(): void {}
}
