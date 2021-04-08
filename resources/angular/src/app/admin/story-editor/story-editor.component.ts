import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Repository } from '../../services/repository.service';
import { Router } from '@angular/router';
import { Story } from '../../models/story.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-story-editor',
  templateUrl: './story-editor.component.html',
  styleUrls: ['./story-editor.component.scss'],
})
export class StoryEditorComponent implements OnInit {
  model: any = {};
  constructor(private repo: Repository, private router: Router, private toastService: ToastService) {}
  ngOnInit(): void {}
  get story(): Story {
    return this.repo.story;
  }
  submit(form: NgForm) {
    const data = {
      title: this.model.title,
      summary: this.model.summary,
      body: this.model.body,
    };
    this.repo.createStory(data).subscribe(() => {
      this.showSuccessToast('Story submitted');
      this.router.navigateByUrl('/members/overview');
      form.reset();
    });
  }

  showSuccessToast(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 5000,
    });
  }
}
