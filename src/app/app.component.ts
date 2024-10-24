import { Component, OnDestroy, OnInit } from '@angular/core';
import { I18nService } from './@shared/service/translate.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private i18nService: I18nService) {}
  title = 'Agedap Llamatron';

  ngOnInit() {
    this.i18nService.init(
      environment.defaultLanguage,
      environment.supportedLanguages
    );
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
