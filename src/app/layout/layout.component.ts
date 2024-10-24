import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: [],
})
export class LayoutComponent implements OnInit {
  constructor(
    private primeNGConfig: PrimeNGConfig,
    private translateService: TranslateService
  ) {}

  public sidebarVisible: boolean = false;
  ngOnInit() {
    const primeNgTranslation = this.translateService.instant('PRIMENG');
    this.primeNGConfig.ripple = true;
    this.primeNGConfig.setTranslation(primeNgTranslation);
    this.primeNGConfig.zIndex = {
      overlay: 1000,
      modal: 1100,
      dropdown: 1200,
      overlaySticky: 1300,
      sidebar: 1400,
      dialog: 1500,
      overlayMenu: 1600,
      tooltip: 1700,
    };
  }
}
