import { Component, OnInit } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { NgForm } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss'],
})
export class CompetitionsComponent implements OnInit {
  listView: boolean = true;
  model: any = {};
  constructor(
    private repo: Repository,
    private parserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.repo.getCompetitions();
  }

  submit(form: NgForm) {
    const date = this.parserFormatter.format(this.model.deadline);

    const data = {
      name: this.model.name,
      description: this.model.description,
      fee: this.model.fee,
      reward: this.model.reward,
      deadline: date,
    };
    this.repo.createCompetition(data);
    this.showList();
    form.reset();
  }

  get competitions(): Competition[] {
    return this.repo.competitions;
  }

  showList() {
    this.listView = true;
  }

  showForm() {
    this.listView = false;
  }
}
