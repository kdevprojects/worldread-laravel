import { Component, Input, OnInit } from '@angular/core';

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

  newComment: any = new Comment();
  constructor(private repo: Repository) {}
  ngOnInit(): void {

  }
  saveComment() {
    //console.log(this.story);
    this.newComment.on_story = this.story.id;
    console.log(this.newComment);
    this.repo.createComment(this.newComment);
    this.newComment = new Comment();
  }
}
