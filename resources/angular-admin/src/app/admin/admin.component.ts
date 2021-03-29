import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  private lastError: string[];
  public isMenuCollapsed = true;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  get error(): string[] {
    return this.lastError;
  }

  clearError() {
    this.lastError = null;
  }
}
