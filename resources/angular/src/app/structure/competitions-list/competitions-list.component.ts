import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.scss'],
})
export class CompetitionsListComponent implements OnInit {
  constructor(private repo: Repository, public userService: UserService) {}

  ngOnInit(): void {
    this.repo.getCompetitions();
  }
  get competitions(): Competition[] {
    return this.repo.competitions;
  }
  get currentUserCompetitions(): number[] {
    return this.repo.profileCompetitionsIds;
  }

  isCompetitionDisabled(id: number): boolean {
    if (this.userService.isUserLoggedIn() && this.currentUserCompetitions?.indexOf(id) != -1) {
      return true;
    }
    return false;
  }
}
