import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  constructor(
    private repo: Repository,
    router: Router,
    activeRoute: ActivatedRoute, public userService: UserService
  ) {
    let param = activeRoute.snapshot.params['param'];
    if (param) {
      this.repo.getCompetition(param);
    } else {
      router.navigateByUrl('/');
    }

  }

  ngOnInit(): void {

  }

  get competition(): Competition {
    return this.repo.competition;
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
