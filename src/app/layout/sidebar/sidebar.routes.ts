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
        path: '/dashboard/test',
        title: 'TEST.TITLE',
        icon: 'pi pi-test',
      },
      {
        path: '/dashboard/chat',
        title: 'Chat',
        icon: 'pi pi-chat',
      },
    ],
  },
];
