import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { FeatureAddTodoComponent } from './feature-add-todo.component';
import { PATHS } from '../../app/app.routes';
import { TodoStore } from '../../data-access-todo';
import { provideHttpClient } from '@angular/common/http';

describe('FeatureAddTodoComponent', () => {
  let spectator: Spectator<FeatureAddTodoComponent>;
  const createComponent = createComponentFactory({
    component: FeatureAddTodoComponent,
    providers: [provideHttpClient()],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('after form submission', () => {
    it('should navigate to the todo list page', () => {
      // Arrange
      const navigateByUrlSpy = jest.spyOn(
        spectator.component['_router'],
        'navigateByUrl',
      );

      // Act
      spectator.component.createTodo({
        date: '2022-01-01T10:00',
        location: 'location',
        content: 'content',
      });

      // Assert
      expect(navigateByUrlSpy).toHaveBeenCalledWith(PATHS.todoListPage);
    });

    it('should add a todo to the store', () => {
      // Act
      spectator.component.createTodo({
        date: '2022-01-01T10:00',
        location: 'location',
        content: 'content',
      });
      // Assert
      expect(spectator.inject(TodoStore).entities()).toContainEqual(
        expect.objectContaining({
          date: '2022-01-01T10:00',
          location: 'location',
          content: 'content',
        }),
      );
    });
  });
});
