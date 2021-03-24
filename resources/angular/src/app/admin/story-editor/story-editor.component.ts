import { Component, OnInit } from '@angular/core';

import { Repository } from '../../services/repository.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-editor',
  templateUrl: './story-editor.component.html',
  styleUrls: ['./story-editor.component.scss'],
})
export class StoryEditorComponent implements OnInit {
  newStory: Story = new Story();
  constructor(private repo: Repository) {}
  ngOnInit(): void {
  }
  get story(): Story {
    return this.repo.story;
  }
  saveStory() {
    this.repo.createStory(this.newStory);
    this.newStory = new Story();
  }
}
