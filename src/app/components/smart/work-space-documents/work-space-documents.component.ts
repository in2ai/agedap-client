import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Relay } from 'src/app/models';
import { RelayService } from 'src/app/service/relay.service';
import { FieldComponent } from '../field/field.component';
import { FileSelectorComponent } from '../file-selector/file-selector.component';

@Component({
  selector: 'app-work-space-documents',
  templateUrl: './work-space-documents.component.html',
  imports: [CommonModule, ReactiveFormsModule, FieldComponent, FileSelectorComponent],
  styles: [':host { width: 100%; }'],
})
export class WorkSpaceDocumentsComponent implements OnInit {
  selectedWorkSpaceType: string = '';
  availableRelays: Relay[] = [];

  @Input()
  formGroup!: FormGroup;

  @Input()
  set workSpaceType(workspaceType: string) {
    this.selectedWorkSpaceType = workspaceType;
  }

  constructor(private relayService: RelayService) {}

  ngOnInit(): void {
    this.recoverRelays();
  }

  async recoverRelays() {
    try {
      this.availableRelays = await this.relayService.getRelays();
    } catch (error) {
      console.log(error);
    }
  }

  initWorkOffersType() {
    this.formGroup = new FormGroup({
      cvZip: new FormControl(''),
      relayId: new FormControl(''),
    });
    console.log('INITIALIZED WORK OFFERS TYPE:', this.formGroup.value);
  }

  initMiscellaneousType() {
    this.formGroup = new FormGroup({
      document: new FormControl(''),
    });
    console.log('INITIALIZED MISCELLANEOUS TYPE', this.formGroup.value);
  }

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }
}
