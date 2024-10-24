import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ViewsComponent } from './views.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'test',
        title: 'Llama',
        loadChildren: () =>
          import('./test/test.module').then((m) => m.TestModule),
        component: TestComponent,
      },
      {
        path: 'chat',
        title: 'Chat',
        loadChildren: () =>
          import('./chat/chat.module').then((m) => m.ChatModule),
        component: ChatComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'test',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
