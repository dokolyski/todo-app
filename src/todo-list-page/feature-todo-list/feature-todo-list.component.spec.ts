import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTodoListComponent } from './feature-todo-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('FeatureTodoListComponent', () => {
  let component: FeatureTodoListComponent;
  let fixture: ComponentFixture<FeatureTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTodoListComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
