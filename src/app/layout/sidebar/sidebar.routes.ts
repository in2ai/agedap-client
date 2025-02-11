import { Params } from '@angular/router';

export interface RouteInfo {
  path: string;
  params?: Params;
  title: string;
  icon: string;
  tabs?: RouteInfo[];
}

export interface MainRouteInfo {
  title: string;
  path: string;
  tabs?: boolean;
  routes: RouteInfo[];
}

export const APP_ROUTES: MainRouteInfo[] = [
  {
    title: 'DASHBOARD.TITLE',
    path: '/dashboard',
    routes: [
      {
        path: '/config',
        title: 'CONFIG.TITLE',
        icon: 'pi pi-cog',
      },
      {
        path: '/chat',
        title: 'CHAT.TITLE',
        icon: 'pi pi-comments',
      },
    ],
  },
];
