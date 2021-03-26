import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../../models/comment.model';
import { Repository } from 'src/app/services/repository.service';
import { Story } from 'src/app/models/story.model';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss'],
})
export class CommentEditorComponent implements OnInit {
  @Input() story: Story;
  commentForm: FormGroup;
  showError: boolean = false;
  newComment: any = new Comment();
  constructor(private repo: Repository, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      body: ['', [Validators.required]],
    });
  }
  onSubmit() {
    const formData = this.commentForm.getRawValue();
    const data = {
      on_story: this.story.id,
      body: formData.body,
    };
    this.repo.createComment(data);
    this.commentForm.reset();
  }
  get body() {
    return this.commentForm.get('body');
  }
}
