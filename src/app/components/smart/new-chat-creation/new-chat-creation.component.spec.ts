import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { NewChatCreationComponent } from './new-chat-creation.component';

class FakeLoader implements TranslateLoader {
  getTranslation() {
    return of({}); // Simula traducciones vacías
  }
}

describe('NewChatCreationComponent', () => {
  let component: NewChatCreationComponent;
  let fixture: ComponentFixture<NewChatCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewChatCreationComponent, // Importa el componente standalone
        CommonModule, // Necesario para directivas como *ngIf, *ngFor
        ReactiveFormsModule, // Necesario para los formularios
        TranslateModule.forRoot({
          // Configura ngx-translate en pruebas
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [TranslateService], // Proveemos TranslateService manualmente
    }).compileComponents();

    fixture = TestBed.createComponent(NewChatCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
