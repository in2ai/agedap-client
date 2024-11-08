import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { ChatComponent } from './chat/chat.component';
import { ConfigComponent } from './config/config.component';
import { TitleResolver } from '../@shared/service/title.resolver';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'config',
        title: TitleResolver,
        data: { titleKey: 'CONFIG.TITLE' },
        loadChildren: () =>
          import('./config/config.module').then((m) => m.ConfigModule),
        component: ConfigComponent,
      },
      {
        path: 'chat',
        title: TitleResolver,
        data: { titleKey: 'CHAT.TITLE' },
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
        component: ChatComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'config',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
