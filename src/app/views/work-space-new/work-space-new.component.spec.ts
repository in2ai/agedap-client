import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { WorkSpaceNewComponent } from './work-space-new.component';

class FakeLoader implements TranslateLoader {
  getTranslation() {
    return of({}); // Simula traducciones vacías
  }
}

describe('WorkSpaceNewComponent', () => {
  let component: WorkSpaceNewComponent;
  let fixture: ComponentFixture<WorkSpaceNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkSpaceNewComponent, // Importa el componente standalone
        CommonModule, // Necesario para directivas como *ngIf, *ngFor
        ReactiveFormsModule, // Necesario para los formularios
        TranslateModule.forRoot({
          // Configura ngx-translate en pruebas
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [TranslateService], // Proveemos TranslateService manualmente
    }).compileComponents();

    fixture = TestBed.createComponent(WorkSpaceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
