import { Component, OnInit } from '@angular/core';
import { Story } from '../../models/story.model';
import { Repository } from '../../services/repository.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.scss']
})
export class StoryDetailComponent implements OnInit {

  constructor(private repo: Repository, router: Router, activeRoute: ActivatedRoute) {
    let id = Number.parseInt(activeRoute.snapshot.params["id"]);
    if (id) {
      this.repo.getStory(id);
    } else {
      router.navigateByUrl("/");
    }
  }

  get story(): Story {
    return this.repo.story;
  }

  ngOnInit(): void {
  }

}
