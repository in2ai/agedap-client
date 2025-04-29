import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { WorkSpaceComponent } from './work-space.component';
import { WorkSpaceService } from 'src/app/service/work-space.service';
import { ModalService } from 'src/app/service/modal.service';
import { WorkSpace, workSpaceTypeEnum } from 'src/app/models';
import { CellClickedEvent } from 'ag-grid-community';

// Fakes para traducir
class FakeLoader implements TranslateLoader {
  getTranslation() {
    return of({});
  }
}

// Mock WorkSpaceService
const mockWorkSpaces: WorkSpace[] = [
  {
    id: '1',
    name: 'Workspace 1',
    description: 'Test',
    type: workSpaceTypeEnum.MISCELLANEOUS,
    createdAt: '',
    updatedAt: '',
    chatIds: [],
  },
  {
    id: '2',
    name: 'Workspace 2',
    description: 'Test 2',
    type: workSpaceTypeEnum.MISCELLANEOUS,
    createdAt: '',
    updatedAt: '',
    chatIds: [],
  },
];

const workSpaceServiceMock = {
  getWorkSpaces: jasmine
    .createSpy('getWorkSpaces')
    .and.returnValue(Promise.resolve(mockWorkSpaces)),
  deleteWorkSpace: jasmine.createSpy('deleteWorkSpace').and.returnValue(Promise.resolve('1')),
};

// Mock ModalService
const modalServiceMock = {
  confirmModal: jasmine.createSpy('confirmModal').and.returnValue(Promise.resolve(true)),
};

// Mock Router
const routerMock = {
  navigate: jasmine.createSpy('navigate'),
};

describe('WorkSpaceComponent', () => {
  let component: WorkSpaceComponent;
  let fixture: ComponentFixture<WorkSpaceComponent>;

  beforeAll(() => {
    (window as any).electronAPI = {
      runNodeCode: (data: any) => {
        return Promise.resolve({ func: data.func, result: 'fake result' });
      },
      onPartialMessageResponse: () => {},
      onNewExternalMessage: () => {},
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkSpaceComponent,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [
        TranslateService,
        { provide: WorkSpaceService, useValue: workSpaceServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpiar mocks para que no arrastre llamadas entre tests
    workSpaceServiceMock.getWorkSpaces.calls.reset();
    workSpaceServiceMock.deleteWorkSpace.calls.reset();
    modalServiceMock.confirmModal.calls.reset();
    routerMock.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call recoverWorkSpaces on ngOnInit', async () => {
    spyOn(component, 'recoverWorkSpaces').and.callThrough();

    await component.ngOnInit();

    expect(component.recoverWorkSpaces).toHaveBeenCalled();
  });

  it('should fetch and set workSpaces in recoverWorkSpaces', async () => {
    await component.recoverWorkSpaces();

    expect(workSpaceServiceMock.getWorkSpaces).toHaveBeenCalled();
    expect(component.workSpaces.length).toBe(2);
    expect(component.workSpaces[0].name).toBe('Workspace 1');
  });

  it('should navigate to create new workspace', () => {
    component.createNewWorkSpace();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/workspace/new']);
  });

  it('should navigate to workspace details on non-removeAction cell click', () => {
    const event = {
      colDef: { colId: 'name' },
      data: { id: '123' },
    } as unknown as CellClickedEvent;

    component.onCellClicked(event);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/workspace', '123']);
  });

  it('should call removeWorkSpace on removeAction cell click', () => {
    const event = {
      colDef: { colId: 'removeAction' },
      data: { id: '123', name: 'Test Workspace' },
    } as unknown as CellClickedEvent;

    spyOn(component, 'removeWorkSpace').and.callThrough();

    component.onCellClicked(event);

    expect(component.removeWorkSpace).toHaveBeenCalledWith(event.data);
  });

  it('should open confirmModal and delete workspace if confirmed', fakeAsync(() => {
    const workspace: WorkSpace = {
      id: '1',
      name: 'Test Workspace',
      description: '',
      type: workSpaceTypeEnum.MISCELLANEOUS,
      createdAt: '',
      updatedAt: '',
      chatIds: [],
    };
    spyOn(component, 'deleteWorkSpace').and.callThrough();
    spyOn(component, 'recoverWorkSpaces').and.callThrough();

    component.removeWorkSpace(workspace);
    tick(); // Avanza el Promise de confirmModal

    expect(modalServiceMock.confirmModal).toHaveBeenCalled();
    expect(component.deleteWorkSpace).toHaveBeenCalledWith('1');
  }));

  it('should call workSpaceService.deleteWorkSpace and refresh workspaces in deleteWorkSpace', fakeAsync(() => {
    spyOn(component, 'recoverWorkSpaces').and.callThrough();

    component.deleteWorkSpace('1');
    tick(); // Avanza el Promise de deleteWorkSpace

    expect(workSpaceServiceMock.deleteWorkSpace).toHaveBeenCalledWith('1');
    expect(component.recoverWorkSpaces).toHaveBeenCalled();
  }));
});
