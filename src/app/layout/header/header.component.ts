import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { APP_ROUTES, MainRouteInfo } from '../sidebar/sidebar.routes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title: string = '';

  private sidebarRoutes: MainRouteInfo[] = APP_ROUTES;
  public tabs: MenuItem[] = [];
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
        this.title = document.title;

        const currentRoute = this.router.url;
        const mainRoute = this.sidebarRoutes.find((route) =>
          currentRoute.includes(route.path)
        );

        if (
          mainRoute &&
          mainRoute.tabs &&
          mainRoute.routes &&
          mainRoute.routes.length > 0
        ) {
          this.tabs = mainRoute.routes.map((route) => {
            return {
              label: this.translateService.instant(route.title),
              icon: route.icon,
              routerLink: route.path,
            };
          });

          this.activeTab = this.tabs.find((tab) =>
            currentRoute.includes(tab.routerLink)
          );
        } else {
          this.activeTab = undefined;
          this.tabs = [];
        }
      }),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
