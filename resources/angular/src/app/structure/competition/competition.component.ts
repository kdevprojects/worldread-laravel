import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Competition } from 'src/app/models/competition.model';
import { Repository } from 'src/app/services/repository.service';
import { Story } from 'src/app/models/story.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  public story: any;
  public stories: any[];
  modalReference: NgbModalRef;

  search: OperatorFunction<string, readonly { title; id }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? [this.stories]
          : this.stories
              .filter(
                (v) => v.title?.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { title: string }) => x.title;

  constructor(
    private repo: Repository,
    router: Router,
    activeRoute: ActivatedRoute,
    public userService: UserService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {
    let param = activeRoute.snapshot.params['param'];
    if (param) {
      this.repo.getCompetition(param);
    } else {
      router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((u) => {
      if (u) {
        this.repo.getProfileStories$(u).subscribe((s) => {
          if (s) {
            this.stories = s;
          }
        });
      }
    });
  }

  get competition(): Competition {
    return this.repo.competition;
  }

  get currentUserCompetitions(): number[] {
    return this.repo.profileCompetitionsIds;
  }

  isCompetitionDisabled(id: number): boolean {
    if (
      this.userService.isUserLoggedIn() &&
      this.currentUserCompetitions?.indexOf(id) != -1
    ) {
      return true;
    }
    return false;
  }

  open(content) {
    this.modalReference = this.modalService.open(content);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  submitStory() {
    console.log(this.story);
    this.repo
      .submitCompetionStory(this.competition, this.story)
      .subscribe((r) => {
        this.showSuccessToast(r.message);
        this.modalService.dismissAll();
      });
  }

  showSuccessToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }
}
