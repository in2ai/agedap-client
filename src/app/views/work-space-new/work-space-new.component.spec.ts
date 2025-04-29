import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkSpaceNewComponent } from './work-space-new.component';
import { WorkSpaceService } from 'src/app/service/work-space.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FieldComponent } from 'src/app/components/smart/field/field.component';
import { SelectComponent } from 'src/app/components/smart/select/select.component';
import { TextareaComponent } from 'src/app/components/smart/textarea/textarea.component';
import { ButtonComponent } from 'src/app/components/ui/button/button.component';
import { WorkSpaceDocumentsComponent } from '../../components/smart/work-space-documents/work-space-documents.component';
import { workSpaceTypeEnum } from 'src/app/models';

describe('WorkSpaceNewComponent', () => {
  let component: WorkSpaceNewComponent;
  let fixture: ComponentFixture<WorkSpaceNewComponent>;
  let workSpaceServiceSpy: jasmine.SpyObj<WorkSpaceService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const workSpaceServiceMock = jasmine.createSpyObj('WorkSpaceService', ['createWorkSpace']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FieldComponent,
        SelectComponent,
        TextareaComponent,
        ButtonComponent,
        WorkSpaceDocumentsComponent,
        WorkSpaceNewComponent, // Standalone
      ],
      providers: [
        { provide: WorkSpaceService, useValue: workSpaceServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkSpaceNewComponent);
    component = fixture.componentInstance;
    workSpaceServiceSpy = TestBed.inject(WorkSpaceService) as jasmine.SpyObj<WorkSpaceService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and workspace types on init', () => {
    expect(component.workSpaceForm).toBeTruthy();
    expect(component.workSpaceDocumentsForm).toBeTruthy();
    expect(component.workSpaceTypes.length).toBeGreaterThan(0);
  });

  it('should call workSpaceService.createWorkSpace and navigate on saveWorkSpace', fakeAsync(async () => {
    const mockWorkSpaceId = '123';
    workSpaceServiceSpy.createWorkSpace.and.resolveTo(mockWorkSpaceId);

    // Set some form values
    component.workSpaceForm.setValue({
      name: 'Test Workspace',
      description: 'Test Description',
      type: 'miscellaneous',
    });
    component.workSpaceDocumentsForm.setValue({
      cvZip: ['test-path'],
      relayId: 'relay-123',
    });

    await component.saveWorkSpace();
    tick();

    expect(workSpaceServiceSpy.createWorkSpace).toHaveBeenCalledWith({
      name: 'Test Workspace',
      description: 'Test Description',
      type: workSpaceTypeEnum.MISCELLANEOUS,
      relayId: 'relay-123',
      documents: [
        {
          type: 'linkedin',
          path: 'test-path',
        },
      ],
    });

    expect(routerSpy.navigate).toHaveBeenCalledWith([`/workspace/${mockWorkSpaceId}`]);
  }));

  it('should log error if saveWorkSpace fails', fakeAsync(async () => {
    const consoleSpy = spyOn(console, 'log');
    const error = new Error('Save failed');
    workSpaceServiceSpy.createWorkSpace.and.rejectWith(error);

    await component.saveWorkSpace();
    tick();

    expect(consoleSpy).toHaveBeenCalledWith(error);
  }));
});
