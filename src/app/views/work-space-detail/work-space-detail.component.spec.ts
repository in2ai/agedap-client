import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WorkSpaceDetailComponent } from './work-space-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from 'src/app/service/work-space.service';
import { ChatService } from 'src/app/service/chat.service';
import { ModalService } from 'src/app/service/modal.service';
import { WorkSpace, workSpaceTypeEnum } from 'src/app/models';
import { Chat } from 'src/app/models';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { DrawerComponent } from '../../components/smart/drawer/drawer.component';
import { WorkSpaceDocumentsComponent } from '../../components/smart/work-space-documents/work-space-documents.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { NewChatCreationComponent } from '../../components/smart/new-chat-creation/new-chat-creation.component';
import { ChatComponent } from '../chat/chat.component';

// Mocks
const mockWorkSpace: WorkSpace = {
  id: '1',
  type: workSpaceTypeEnum.MISCELLANEOUS,
  name: 'Workspace 1',
  description: 'Test',
  createdAt: '2025-01-01T00:00:00Z',
  updatedAt: '2025-01-01T08:10:00Z',
  chatIds: ['chat1', 'chat2'],
};

const mockChats: Chat[] = [
  { id: 'chat1', name: 'Chat 1', description: '', createdAt: '', updatedAt: '', workspaceId: '1' },
  { id: 'chat2', name: 'Chat 2', description: '', createdAt: '', updatedAt: '', workspaceId: '1' },
];

describe('WorkSpaceDetailComponent', () => {
  let component: WorkSpaceDetailComponent;
  let fixture: ComponentFixture<WorkSpaceDetailComponent>;
  let workSpaceServiceSpy: jasmine.SpyObj<WorkSpaceService>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    workSpaceServiceSpy = jasmine.createSpyObj('WorkSpaceService', ['getWorkSpace']);
    chatServiceSpy = jasmine.createSpyObj('ChatService', ['getChats', 'createChat', 'deleteChat']);
    modalServiceSpy = jasmine.createSpyObj('ModalService', ['confirmModal']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        DrawerComponent,
        WorkSpaceDocumentsComponent,
        AgGridAngular,
        ButtonComponent,
        NewChatCreationComponent,
        ChatComponent,
        WorkSpaceDetailComponent,
      ],
      providers: [
        { provide: WorkSpaceService, useValue: workSpaceServiceSpy },
        { provide: ChatService, useValue: chatServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { workSpaceId: '1', chatId: '' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkSpaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recover workspace and chats on init', fakeAsync(() => {
    workSpaceServiceSpy.getWorkSpace.and.returnValue(Promise.resolve(mockWorkSpace));
    chatServiceSpy.getChats.and.returnValue(Promise.resolve(mockChats));

    component.recoverWorkSpace();
    tick();

    expect(workSpaceServiceSpy.getWorkSpace).toHaveBeenCalledWith('1');
    expect(component.workSpace).toEqual(mockWorkSpace);
    expect(chatServiceSpy.getChats).toHaveBeenCalledWith('1');
    expect(component.chats.length).toBe(2);
  }));

  it('should handle cell click to select chat', () => {
    const event: any = {
      data: mockChats[0],
      colDef: { colId: 'name' },
    };

    component.onCellClicked(event);
    expect(component.chatId).toBe('chat1');
  });

  it('should handle cell click to remove chat', () => {
    spyOn(component, 'removeChat');

    const event: any = {
      data: mockChats[0],
      colDef: { colId: 'removeAction' },
    };

    component.onCellClicked(event);
    expect(component.removeChat).toHaveBeenCalledWith(mockChats[0]);
  });

  it('should create a new chat and refresh chats', fakeAsync(() => {
    const newChat: Chat = {
      id: '',
      name: 'Nuevo chat',
      description: '',
      createdAt: '',
      updatedAt: '',
      workspaceId: '1',
    };
    chatServiceSpy.createChat.and.returnValue(Promise.resolve('newChatId'));
    chatServiceSpy.getChats.and.returnValue(Promise.resolve(mockChats));

    component.createNewChat(newChat);
    tick();

    expect(chatServiceSpy.createChat).toHaveBeenCalled();
    expect(component.chatId).toBe('newChatId');
    expect(chatServiceSpy.getChats).toHaveBeenCalled();
  }));

  it('should show and hide new chat creation modal', () => {
    component.showNewChatCreation();
    expect(component.isNewChatCreationVisible).toBeTrue();

    component.hideNewChatCreation();
    expect(component.isNewChatCreationVisible).toBeFalse();
  });

  it('should delete chat after confirmation', fakeAsync(() => {
    modalServiceSpy.confirmModal.and.returnValue(Promise.resolve(true));
    chatServiceSpy.deleteChat.and.returnValue(Promise.resolve(''));
    chatServiceSpy.getChats.and.returnValue(Promise.resolve(mockChats));

    component.removeChat(mockChats[0]);
    tick();
    expect(chatServiceSpy.deleteChat).toHaveBeenCalledWith('chat1');
    expect(chatServiceSpy.getChats).toHaveBeenCalled();
  }));

  it('should not delete chat if confirmation is cancelled', fakeAsync(() => {
    modalServiceSpy.confirmModal.and.returnValue(Promise.resolve(false));

    component.removeChat(mockChats[0]);
    tick();

    expect(chatServiceSpy.deleteChat).not.toHaveBeenCalled();
  }));

  it('should toggle configuration drawer', () => {
    expect(component.showConfiguration).toBeFalse();

    component.onToggleConfiguration();
    expect(component.showConfiguration).toBeTrue();

    component.onToggleConfiguration();
    expect(component.showConfiguration).toBeFalse();
  });
});
