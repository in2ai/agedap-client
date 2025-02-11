import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  styleUrls: [],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebar') sidebar: any;

  constructor(
  ) {}

  ngOnInit() {
  }

  onToggleSidebar() {
    this.sidebar.toggleSidebar();
  }
}
