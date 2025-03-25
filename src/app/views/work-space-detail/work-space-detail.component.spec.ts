import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { WorkSpaceDetailComponent } from './work-space-detail.component';

class FakeLoader implements TranslateLoader {
  getTranslation() {
    return of({}); // Simula traducciones vacías
  }
}

describe('WorkSpaceDetailComponent', () => {
  let component: WorkSpaceDetailComponent;
  let fixture: ComponentFixture<WorkSpaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WorkSpaceDetailComponent, // Importa el componente standalone
        CommonModule, // Necesario para directivas como *ngIf, *ngFor
        ReactiveFormsModule, // Necesario para los formularios
        RouterTestingModule, // Agrega RouterTestingModule para simular enrutamiento
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
      ],
      providers: [
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { workSpaceId: 'test-workspace-id', chatId: 'test-chat-id' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkSpaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
