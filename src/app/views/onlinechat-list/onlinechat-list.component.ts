import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { isoStringToddMMYYYYhhmmss } from 'src/app/helpers/utils';

// AG-Grid
import { AgGridAngular } from 'ag-grid-angular';
import type { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { OnlineChat } from 'src/app/models/onlinechat';
import { OnlineChatService } from 'src/app/service/onlinechat.service';
import { WorkSpaceDeleteRendererComponent } from 'src/app/components/aggrid/work-space-delete-renderer/work-space-delete-renderer.component';
import { ModalService } from 'src/app/service/modal.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-onlinechat-list',
  templateUrl: './onlinechat-list.component.html',
  styles: [':host { width: 100%; }'],
  imports: [CommonModule, TranslateModule, AgGridAngular],
})
export class OnlineChatListComponent implements OnInit {
  router = inject(Router);

  constructor(
    private onlineChatService: OnlineChatService,
    private modalService: ModalService
  ) {}

  // Table configutation
  public onlineChats: OnlineChat[] = [];
  public colDefs: ColDef<OnlineChat>[] = [
    {
      field: 'id',
      headerName: 'Chat ID',
    },
    {
      field: 'authors',
      headerName: 'ID de destinatario',
      valueGetter: (params) => {
        if (params && params.data && params.data.authors && params.data.authors.length > 0) {
          const authors = params.data.authors;
          if (authors && authors.length > 0) {
            return authors[1].toString();
          }
        }
        return '';
      },
    },
    {
      field: 'createdAt',
      headerName: 'Creado el',
      valueFormatter: (params) => isoStringToddMMYYYYhhmmss(params.value),
    },
    {
      colId: 'removeAction',
      field: 'id',
      headerName: 'Eliminar',
      pinned: 'right',
      width: 100,
      cellRenderer: WorkSpaceDeleteRendererComponent,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };

  onCellClicked = (event: CellClickedEvent) => {
    const rowSelected = event.data;

    if (event.colDef.colId === 'removeAction') {
      return this.removeOnlineChat(rowSelected);
    }

    return this.router.navigate(['/onlinechat', event.data.id]);
  };

  ngOnInit() {
    this.load();
  }

  async load() {
    try {
      this.onlineChats = await this.onlineChatService.getOnlineChats();
      console.log('Online chats: ', this.onlineChats);
    } catch (error) {
      console.log(error);
    }
  }

  removeOnlineChat(chat: OnlineChat) {
    this.modalService
      .confirmModal(
        'Eliminar chat online',
        `¿Está seguro de querer eliminar este chat online "${chat.id}"?`
      )
      .then((result) => {
        console.log('Modal result:', result);
        if (result) {
          if (chat.id) this.deleteOnlineChat(chat.id);
        }
      });
  }

  async deleteOnlineChat(id: string) {
    try {
      await this.onlineChatService.deleteOnlineChat(id);
      console.log('Deleted online chat with ID:', id);
      this.load(); // Reload the list after deletion
    } catch (error) {
      console.log(error);
    }
  }
}
