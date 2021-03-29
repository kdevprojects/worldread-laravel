import { Component, OnInit } from '@angular/core';

import { Repository } from '../../services/repository.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
    this.repo.getMembers();
  }

  get members(): User[] {
    return this.repo.members;
  }

}
