import { Params } from '@angular/router';

export interface RouteInfo {
  path: string;
  params?: Params;
  title: string;
  icon: string;
}
