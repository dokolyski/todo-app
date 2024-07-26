import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTodoListComponent } from './feature-todo-list.component';

describe('FeatureTodoListComponent', () => {
  let component: FeatureTodoListComponent;
  let fixture: ComponentFixture<FeatureTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTodoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
