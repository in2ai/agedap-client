import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ConfigComponent } from './config.component';

class FakeLoader implements TranslateLoader {
  getTranslation() {
    return of({}); // Simula traducciones vacías
  }
}

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfigComponent, // Importa el componente standalone
        CommonModule, // Necesario para directivas como *ngIf, *ngFor
        ReactiveFormsModule, // Necesario para los formularios
        TranslateModule.forRoot({
          // Configura ngx-translate en pruebas
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [TranslateService], // Proveemos TranslateService manualmente
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
