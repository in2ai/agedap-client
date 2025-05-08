import { MainRouteInfo, RouteInfo } from 'src/app/models';

export const APP_ROUTES: MainRouteInfo[] = [
  {
    title: 'DASHBOARD.TITLE',
    path: '/dashboard',
    routes: [
      {
        path: '/workspace',
        title: 'WORKSPACE.TITLE',
        icon: 'pi pi-desktop',
      },
      {
        path: '/onlinechat',
        title: 'Conversaciones en línea',
        icon: 'pi pi-comments',
      },
    ],
  },
];

export const CONFIG_ROUTE: RouteInfo = {
  path: '/config',
  title: 'CONFIG.TITLE',
  icon: 'pi pi-cog',
};
