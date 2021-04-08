import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
    this.repo.getResults();
  }

  get results(): Competition[] {
    return this.repo.results;
  }

}
