import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';
import { Story } from 'src/app/models/story.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  stories: Story[];
  competitions: Competition[];
  constructor(private repo: Repository, private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((u) => {
      if (u) {
        this.repo.getProfileCompetitions$(u).subscribe((c) => {
          this.competitions = c;
          console.log(c);
        });
        this.repo.getProfileStories$(u).subscribe((s) => {
          this.stories = s;
          console.log(s);
        });
      }
    });
  }
}
