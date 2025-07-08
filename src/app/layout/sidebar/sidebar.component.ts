import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavLinkComponent } from 'src/app/components/ui/nav-link/nav-link.component';
import { MainRouteInfo, RouteInfo } from 'src/app/models';
import { AppService } from 'src/app/service/app.service';
import { environment } from 'src/environments/environment';
import { APP_ROUTES, CONFIG_ROUTE } from './sidebar.routes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
  imports: [CommonModule, TranslateModule, RouterLink, NavLinkComponent],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  public sidebarCollapsed = false;
  public sidebarVisible = true;
  public mainRoutes: MainRouteInfo[] = APP_ROUTES;
  public configRoute: RouteInfo = CONFIG_ROUTE;
  public appName: string = environment.appName;
  public modelLoaded: boolean = false;
  private appDataSubscription: any;

  ngOnInit(): void {
    this.appDataSubscription = this.appService.watchData().subscribe((data) => {
      if (typeof data.modelLoaded === 'boolean') {
        this.modelLoaded = data.modelLoaded;
      }
    });
  }

  ngOnDestroy(): void {
    this.appDataSubscription.unsubscribe();
  }

  isMainRouteActive(route: MainRouteInfo) {
    return this.router.url.startsWith(route.path);
  }

  isRouteActive(route: RouteInfo) {
    let checkFullPath = route.path;
    if (route.params) {
      checkFullPath += '?';
      for (const key in route.params) {
        if (route.params.hasOwnProperty(key)) {
          checkFullPath += key + '=' + route.params[key] + '&';
        }
      }
      checkFullPath = checkFullPath.slice(0, -1);
    }

    return this.router.url.startsWith(checkFullPath);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  topggleSidebarCollapse() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
