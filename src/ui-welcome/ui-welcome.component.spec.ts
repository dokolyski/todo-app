import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiWelcomeComponent } from './ui-welcome.component';

describe('UiWelcomeComponent', () => {
  let component: UiWelcomeComponent;
  let fixture: ComponentFixture<UiWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
