import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private subscription = new Subject<any>();

  watchData(): Observable<any> {
    return this.subscription.asObservable();
  }

  sendData(data: any): void {
    this.subscription.next(data);
  }
}
