import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post.model';
import { Repository } from 'src/app/services/repository.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  listView: boolean = true;
  model: any = {};
  constructor(
    private repo: Repository,
    private parserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.repo.getPosts();
  }

  submit(form: NgForm) {
    console.log(this.model);
    const data = {
      body: this.model.body,
      summary: this.model.summary,
      title: this.model.title,
      picture: this.model?.picture || '',
    };
    this.repo.createPost(data);
    this.showList();
    form.reset();
  }

  get posts(): Post[] {
    return this.repo.posts;
  }

  showList() {
    this.listView = true;
  }

  showForm() {
    this.listView = false;
  }
}
