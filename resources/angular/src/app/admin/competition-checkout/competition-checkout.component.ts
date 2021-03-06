import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-competition-checkout',
  templateUrl: './competition-checkout.component.html',
  styleUrls: ['./competition-checkout.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CompetitionCheckoutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showStatusScreen = false;
  constructor(
    private repo: Repository,
    public router: Router,
    activeRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    let param = activeRoute.snapshot.params['param'];
    if (param) {
      this.repo.getCompetition(param);
    } else {
      router.navigateByUrl('/');
    }
  }

  get competition(): Competition {
    return this.repo.competition;
  }

  ngOnInit(): void {
    if (this.isCompetitionDisabled(this.competition.id)) {
      this.router.navigateByUrl('/members/overview');
      this.showStandardToast("Your're already taking part in this competition");
    }
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'GBP',
      clientId:
        'AawjmRbKugS-b2dgHHjA064BBwQmhpozkbZiMJUkm5ygM_47k0Xs1sYmSMP3Z7fEeIQ-rlWgp44le2Gz',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'GBP',
                value: this.competition.fee.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'GBP',
                    value: this.competition.fee.toString(),
                  },
                },
              },
              items: [
                {
                  name: `Writing Competition Entry Fee (${this.competition.name.toString()})`,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'GBP',
                    value: this.competition.fee.toString(),
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          this.showStandardToast('Payment approved');
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        //this.showSuccess = true;
        this.showSuccessToast('Payment authorized');
        this.repo.enterCompetition(this.competition).subscribe(
          (data) => {
            this.showSuccessToast(data.message);
            this.showStatusScreen = true;
            //this.router.navigateByUrl('/members/overview');
          },
          (err) => console.error(err)
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        //this.showCancel = true;
        this.showDangerToast('Payment cancelled');
      },
      onError: (err) => {
        console.log('OnError', err);
        //this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        //this.resetStatus();
      },
    };
  }

  showStandardToast(message: string) {
    this.toastService.show(message);
  }

  showSuccessToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }

  showDangerToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
  }

  get currentUserCompetitions(): number[] {
    return this.repo.profileCompetitionsIds;
  }

  isCompetitionDisabled(id: number): boolean {
    if (this.currentUserCompetitions?.indexOf(id) != -1) {
      return true;
    }
    return false;
  }
}
