import { Component, OnInit } from '@angular/core';
import { WorkSpace } from 'src/app/models';

@Component({
  selector: 'app-work-space-detail',
  templateUrl: './work-space-detail.component.html',
  styles: [':host { width: 100%; }'],
})
export class WorkSpaceDetailComponent implements OnInit {
  workSpace!: WorkSpace;

  constructor() {}

  ngOnInit(): void {
    // Recover workspace from API
    this.workSpace = {
      id: '1',
      name: 'Workspace 1',
      description: 'Description of Workspace 1',
    };
  }
}
