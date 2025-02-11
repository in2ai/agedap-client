import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { TitleResolver } from './@shared/service/title.resolver';
import { ConfigComponent } from './views/config/config.component';
import { ChatComponent } from './views/chat/chat.component';

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
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: TitleResolver,
    data: { titleKey: '404.TITLE' },
  },
];
