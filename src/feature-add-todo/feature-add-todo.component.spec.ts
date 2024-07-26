import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureAddTodoComponent } from './feature-add-todo.component';

describe('FeatureAddTodoComponent', () => {
  let component: FeatureAddTodoComponent;
  let fixture: ComponentFixture<FeatureAddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureAddTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureAddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
