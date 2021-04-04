import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
} from '@angular/core';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-competition-checkout',
  templateUrl: './competition-checkout.component.html',
  styleUrls: ['./competition-checkout.component.scss'],
})
export class CompetitionCheckoutComponent implements OnInit {

  ngOnInit() {
  }
  constructor() {}
}
