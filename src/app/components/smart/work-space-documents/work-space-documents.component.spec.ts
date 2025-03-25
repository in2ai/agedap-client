import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroup } from '@angular/forms';
import { WorkSpaceDocumentsComponent } from './work-space-documents.component';

describe('WorkSpaceDocumentsComponent', () => {
  let component: WorkSpaceDocumentsComponent;
  let fixture: ComponentFixture<WorkSpaceDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSpaceDocumentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkSpaceDocumentsComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
