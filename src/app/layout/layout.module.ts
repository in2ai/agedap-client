import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    AvatarModule,
    RippleModule,
    StyleClassModule,
    TranslateModule,
    TabMenuModule,
  ],
  providers: [DatePipe],
  exports: [LayoutComponent],
})
export class LayoutModule {}
