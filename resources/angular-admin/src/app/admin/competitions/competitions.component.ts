import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Competition } from 'src/app/models/competition.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
    private fb: FormBuilder,
    private parserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.repo.getCompetitions();
  }

  onSubmit() {
    console.log(this.model);
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
