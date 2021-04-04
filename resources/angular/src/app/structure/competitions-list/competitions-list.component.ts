import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.scss']
})
export class CompetitionsListComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
    this.repo.getCompetitions();
  }
  get competitions(): Competition[] {
    return this.repo.competitions;
  }
}
