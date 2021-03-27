import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Repository } from 'src/app/services/repository.service';
import { Story } from 'src/app/models/story.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private repo: Repository, router: Router, activeRoute: ActivatedRoute) {
    let param = activeRoute.snapshot.params['param'];
    if (param) {
      this.repo.getProfile(param);
      this.repo.getProfileStories(param);
    } else {
      router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
  }

  get profile(): User {
    return this.repo.profile;
  }

  get stories(): Story[] {
    return this.repo.profileStories;
  }

}
