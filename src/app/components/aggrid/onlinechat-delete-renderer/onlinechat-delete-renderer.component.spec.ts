import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineChatDeleteRendererComponent } from './onlinechat-delete-renderer.component';

describe('OnlineChatDeleteRendererComponent', () => {
  let component: OnlineChatDeleteRendererComponent;
  let fixture: ComponentFixture<OnlineChatDeleteRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineChatDeleteRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineChatDeleteRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
