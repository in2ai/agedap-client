import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: [],
  imports: [TranslateModule, ButtonModule],
})
export class PageNotFoundComponent {
  constructor() {}
}
