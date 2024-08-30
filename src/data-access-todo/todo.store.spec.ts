import { TodoStore } from './todo.store';
import { TODO_LIST_MOCK } from './__mocks__/todo-list.mock';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { provideHttpClient } from '@angular/common/http';
import { TodoApiService } from './todo-api.service';
import { of } from 'rxjs';

describe('TodoStore', () => {
  const createStore = createServiceFactory({
    service: TodoStore,
    providers: [provideHttpClient()],
  });

  it('should be created', () => {
    // Arrange
    const spectator = createStore();
    expect(spectator.service).toBeTruthy();
  });

  describe('search term splits by space and each part must match with date, location or content', () => {
    it('should filter todos by search term', () => {
      // Arrange
      // There is 3 todos with location 'Home' at 10:00 time
      const store = createStore().service;
      store.setTodoList(TODO_LIST_MOCK);
      store.setSearchTerm('home 10:00');

      // Act & Assert
      expect(store.filteredTodos().length).toEqual(3);
    });
  });

  describe('upcomingTodosNumber', () => {
    it('should count upcoming todos', async () => {
      // Arrange
      const store = createStore().service;
      store.setTodoList([
        /*past*/ {
          id: 1,
          date: '2022-01-01T10:00',
          location: 'Home',
          content: 'content',
        },
        /*past*/ {
          id: 2,
          date: '2022-01-02T10:00',
          location: 'Home',
          content: 'content',
        },
        /*past*/ {
          id: 3,
          date: '2022-01-03T10:00',
          location: 'Home',
          content: 'content',
        },
        /*future*/ {
          id: 4,
          date: '2121-01-01T10:00',
          location: 'Home',
          content: 'content',
        },
      ]);

      // Act & Assert
      expect(store.upcomingTodosNumber()).toEqual(1);
    });
  });

  describe('loadTemperatureForLocation', () => {
    describe('when location is not found', () => {
      it('should set error message', async () => {
        // Arrange
        const spectator = createStore({
          providers: [
            {
              provide: TodoApiService,
              useValue: {
                loadCoordinates: jest.fn(() => of({ results: [] })),
              },
            },
          ],
        });
        const store = spectator.service;
        store.setTodoList([
          {
            id: 1,
            date: '2022-01-01T10:00',
            location: 'Home',
            content: 'content',
          },
        ]);
        const todo = store.entities()[0];

        // Act
        store.loadTemperatureForLocation(todo);

        // Assert
        expect(spectator.inject(TodoApiService).loadCoordinates).toBeCalledWith(
          { location: todo.location },
        );
        expect(store.entities()[0].temperatureLoadingError).toEqual(
          'Coordinates not found',
        );
      });
    });
    describe('when location is found', () => {
      it('should set the loaded temperature', async () => {
        // Arrange
        const spectator = createStore({
          providers: [
            {
              provide: TodoApiService,
              useValue: {
                loadCoordinates: jest.fn(() =>
                  of({ results: [{ geometry: { lat: 1, lng: 1 } }] }),
                ),
                loadTemperatureForCoordinates: jest.fn(() =>
                  of({
                    current: { temperature_2m: 20 },
                    current_units: { temperature_2m: '°C' },
                  }),
                ),
              },
            },
          ],
        });
        const store = spectator.service;
        store.setTodoList([
          {
            id: 1,
            date: '2022-01-01T10:00',
            location: 'Home',
            content: 'content',
          },
          {
            id: 2,
            date: '2022-01-02T10:00',
            location: 'Home',
            content: 'content',
          },
        ]);
        const todo = store.entities()[0];

        // Act
        store.loadTemperatureForLocation(todo);

        // Assert
        expect(spectator.inject(TodoApiService).loadCoordinates).toBeCalledWith(
          { location: todo.location },
        );
        expect(
          spectator.inject(TodoApiService).loadTemperatureForCoordinates,
        ).toBeCalledWith({
          geometry: {
            lat: 1,
            lng: 1,
          },
        });
        expect(store.entities()[0].temperature).toEqual({
          value: 20,
          unit: '°C',
        });
      });
    });
  });
});
