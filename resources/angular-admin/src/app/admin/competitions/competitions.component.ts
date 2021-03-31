import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
    this.repo.getCompetitions();
  }

  get competitions(): Competition[] {
    return this.repo.competitions;
  }

}
