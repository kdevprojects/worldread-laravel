import { Component, OnInit } from '@angular/core';
import { Repository } from "../../services/repository.service";
import { Story } from "../../models/story.model";

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrls: ['./stories-list.component.scss']
})
export class StoriesListComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
  }

  get stories(): Story[] {
    return this.repo.stories;
  }
}
