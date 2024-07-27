import {TodoStore} from './todo.store';
import {TODO_LIST_MOCK} from './__mocks__/todo-list.mock';

describe('TodoStore', () => {
  it('should be created', () => {
    const store = new TodoStore(TODO_LIST_MOCK);
    expect(store).toBeTruthy();
  });

  describe('search term splits by space and each part must match with date, location or content', () => {
    it('should filter todos by search term', () => {
      // Arrange
      // There is 3 todos with location 'Home' at 10:00 time
      const store = new TodoStore();
      store.setTodoList(TODO_LIST_MOCK);
      store.setSearchTerm('home 10:00');

      // Act & Assert
      expect(store.filteredTodos().length).toEqual(3);
    });
  });
});
