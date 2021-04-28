import { Component, OnInit } from '@angular/core';

import { Post } from "../../models/post.model";
import { Repository } from "../../services/repository.service";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  constructor(private repo: Repository) { }

  ngOnInit(): void {
    this.repo.getPosts();
  }

  get posts(): Post[] {
    return this.repo.posts;
  }
}
