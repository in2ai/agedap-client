import { Component } from '@angular/core';
import { APP_ROUTES, MainRouteInfo, RouteInfo } from './sidebar.routes';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  public mainRoutes: MainRouteInfo[] = APP_ROUTES;
  public appName: string = environment.appName;

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
}
