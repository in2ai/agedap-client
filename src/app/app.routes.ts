import { Routes } from '@angular/router';
import { TitleResolver } from './service/title.resolver';
import { ConfigComponent } from './views/config/config.component';
import { OnlineChatListComponent } from './views/onlinechat-list/onlinechat-list.component';
import { OnlineChatComponent } from './views/onlinechat/onlinechat.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { WorkSpaceDetailComponent } from './views/work-space-detail/work-space-detail.component';
import { WorkSpaceNewComponent } from './views/work-space-new/work-space-new.component';
import { WorkSpaceComponent } from './views/work-space/work-space.component';
import { ChatV2Component } from './views/chatv2/chatv2.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'config',
  },
  {
    path: 'config',
    component: ConfigComponent,
  },
  {
    path: 'workspace',
    component: WorkSpaceComponent,
  },
  {
    path: 'workspace/new',
    component: WorkSpaceNewComponent,
  },
  {
    path: 'workspace/:workSpaceId',
    component: WorkSpaceDetailComponent,
  },
  {
    path: 'workspace/:workSpaceId/chat/:chatId',
    component: WorkSpaceDetailComponent,
  },
  {
    path: 'chat/:id',
    component: ChatV2Component,
  },
  {
    path: 'onlinechat',
    component: OnlineChatListComponent,
  },
  {
    path: 'onlinechat/:chatId',
    component: OnlineChatComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: TitleResolver,
    data: { titleKey: '404.TITLE' },
  },
];
