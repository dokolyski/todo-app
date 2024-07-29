import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {addEntity, setEntities, updateEntity, withEntities} from "@ngrx/signals/entities";
import {TODO_LIST_MOCK} from "./__mocks__/todo-list.mock";
import {computed, inject} from "@angular/core";
import {DateTimeString} from "../shared/types/date-time-string.type";
import {isMatchingSearchTerm} from "../shared/utilities/is-matching-search-term.util";
import {TodoApiService} from "./todo-api.service";
import {catchError, filter, pipe, switchMap, tap} from "rxjs";
import {rxMethod} from "@ngrx/signals/rxjs-interop";

/**
 * I resign from the display property
 * since I prefer different way of implementing filtering functionality
 **/
export interface Todo {
  id: number;
  date: DateTimeString;
  location: string;
  content: string;

  // Todo object is enhanced with temperature properties after call of loadTemperatureForLocation method
  temperature?: {
    value: number;
    unit: string;
  };
  temperatureLoadingError?: string;
}

export const TodoStore = signalStore(
  {providedIn: 'root'},
  withState(() => ({searchTerm: '', temperature: null as null | string})),
  withEntities<Todo>(),
  withHooks({
    // todo: onInit required only if we're utilizing a mock data
    onInit: (store) => {
      patchState(store, setEntities(TODO_LIST_MOCK))
    }
  }),
  withMethods((store, todoApiService = inject(TodoApiService)) => ({
    setTodoList: (todoList: Todo[]) => {
      patchState(store, setEntities(todoList));
    },
    setSearchTerm: (searchTerm: string) => {
      patchState(store, {searchTerm});
    },
    addTodo: (todo: Omit<Todo, 'id'>) => {
      patchState(store, addEntity({...todo, id: generateId(store.entities().length)}));
    },
    loadTemperatureForLocation: rxMethod<Todo | undefined>(
      pipe(
        filter(Boolean),
        switchMap((todo) => todoApiService.loadCoordinates({location: todo.location}).pipe(
          switchMap((response) => {
            if (response.results?.[0]) {
              return todoApiService.loadTemperatureForCoordinates(response.results?.[0])
            }
            throw new Error('Coordinates not found');
          }),
          tap((response) => patchState(store, updateEntity({
            id: todo.id,
            changes: entity => ({
              ...entity,
              temperature: {value: response.current.temperature_2m, unit: response.current_units.temperature_2m}
            })
          }))),
          catchError((error: Error) => {
            patchState(store, updateEntity({
              id: todo.id,
              changes: entity => ({
                ...entity,
                temperatureLoadingError: error.message
              })
            }))
            throw error;
          })
        )),
      )
    )
  })),
  withComputed((store) => ({
    filteredTodos: computed(() => store.entities().filter(todo => isMatchingSearchTerm(store.searchTerm().trim().split(' '), todo, ['date', 'location', 'content']))),
    upcomingTodosNumber: computed(() => store.entities().filter(todo => new Date(todo.date) > new Date()).length)
  })),
)

// works only assuming that existing entities have ids in range 1..entitiesLength
function generateId(entitiesLength: number) {
  return entitiesLength + 1;
}
