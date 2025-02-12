import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MainRouteInfo } from 'src/models';
import { APP_ROUTES } from '../sidebar/sidebar.routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  imports: [CommonModule, TranslateModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();
  public title: string = '';
  public icon: string = '';

  private appRoutes: MainRouteInfo[] = APP_ROUTES;
  public activeTab: MenuItem | undefined = undefined;

  private subscriptions: any[] = [];
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.title = document.title;
    this.subscriptions = [
      this.router.events.subscribe(() => {
        const currentRoute = this.router.url;
        const mainRoute = this.appRoutes[0].routes.find((route) =>
          currentRoute.includes(route.path)
        );
        this.title = mainRoute?.title || document.title;
      }),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  toggleSidebarButton() {
    if (this.toggleSidebar) {
      this.toggleSidebar.emit();
    }
  }
}
