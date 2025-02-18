import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FAKE_WORKSPACES, WorkSpace } from 'src/app/models';
import { DrawerComponent } from '../../components/smart/drawer/drawer.component';
import { WorkSpaceDocumentsComponent } from '../../components/smart/work-space-documents/work-space-documents.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-work-space-detail',
  templateUrl: './work-space-detail.component.html',
  styles: [':host { width: 100%; }'],
  imports: [ChatComponent, DrawerComponent, WorkSpaceDocumentsComponent],
})
export class WorkSpaceDetailComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);

  showConfiguration = false;
  workSpace!: WorkSpace;
  public workSpaceDocumentsForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const workSpaceId = this.activatedRoute.snapshot.params['id'] ?? '';
    if (workSpaceId) {
      this.recoverWorkSpace(workSpaceId);
    }

    this.workSpaceDocumentsForm = new FormGroup({
      cvZip: new FormControl(''),
      urlRelay: new FormControl(''),
    });
  }

  recoverWorkSpace(workSpaceId: string) {
    // TODO: fetch workspace from API
    const findWorkSpace = FAKE_WORKSPACES.find((ws) => ws.id === workSpaceId);
    if (findWorkSpace) {
      this.workSpace = findWorkSpace;
    }
  }

  onToggleConfiguration(): void {
    this.showConfiguration = !this.showConfiguration;
  }
}
