import { Component, OnInit } from '@angular/core';

import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  constructor(private repo: Repository) {}
  ngOnInit(): void {
    console.log(this.repo.profileCompetitions);
  }
}
