import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { UiTodoListComponent } from './ui-todo-list.component';

const selectors = {
  todoListItem: '#todo-list-item',
  temperature: '#temperature',
  temperatureError: '#temperature-error',
}

describe('UiTodoListComponent', () => {
  let spectator: Spectator<UiTodoListComponent>;
  const createComponent = createComponentFactory(UiTodoListComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should display all passed todos', () => {
    // Arrange
    const todos = [
      { id: 1, date: '2021-01-01T00:00', location: 'location 1', content: 'content 1' },
      { id: 2, date: '2021-01-02T00:00', location: 'location 2', content: 'content 2' },
    ];

    // Act
    spectator.setInput('todos', todos);

    // Assert
    const todoListItems = spectator.queryAll(selectors.todoListItem);
    expect(todoListItems).toHaveLength(todos.length);
  });

  describe('when temperature is set to the first todo', () => {
    it('should display the temperature', () => {
      // Arrange
      const todos = [
        { id: 1, date: '2021-01-01T00:00', location: 'location 1', content: 'content 1', temperature: { value: 20, unit: '°C' } },
        { id: 2, date: '2021-01-02T00:00', location: 'location 2', content: 'content 2' },
      ];

      // Act
      spectator.setInput('todos', todos);

      // Assert
      const temperature = spectator.query(selectors.temperature);
      expect(temperature).toHaveText('20°C');
    });
  })

  describe('when temperatureLoadingError is set to the first todo', () => {
    it('should display the temperature error', () => {
      // Arrange
      const todos = [
        { id: 1, date: '2021-01-01T00:00', location: 'location 1', content: 'content 1', temperatureLoadingError: 'Error loading temperature' },
        { id: 2, date: '2021-01-02T00:00', location: 'location 2', content: 'content 2' },
      ];

      // Act
      spectator.setInput('todos', todos);

      // Assert
      const temperatureError = spectator.query(selectors.temperatureError);
      expect(temperatureError).toHaveText('Error loading temperature');
    });
  })
});
