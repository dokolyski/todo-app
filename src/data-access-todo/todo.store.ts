import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {setEntities, withEntities} from "@ngrx/signals/entities";
import {TODO_LIST_MOCK} from "./__mocks__/todo-list.mock";
import {computed} from "@angular/core";
import {DateTimeString} from "../shared/types/date-time-string.type";
import {isMatchingSearchTerm} from "../shared/utilities/is-matching-search-term.util";

/**
 * I resign from the display property
 * since I prefer different way of implementing filtering functionality
 **/
export interface Todo {
  id: number;
  date: DateTimeString;
  location: string;
  content: string;
}

export const TodoStore = signalStore(
  {providedIn: 'root'},
  withState(() => ({searchTerm: ''})),
  withEntities<Todo>(),
  withHooks({
    // todo: onInit required only if we're utilizing a mock data
    onInit: (store) => {
      patchState(store, setEntities(TODO_LIST_MOCK))
    }
  }),
  withMethods(store => ({
    setTodoList: (todoList: Todo[]) => {
      patchState(store, setEntities(todoList));
    },
    setSearchTerm: (searchTerm: string) => {
      patchState(store, {searchTerm});
    }
  })),
  withComputed((store) => ({
    filteredTodos: computed(() => store.entities().filter(todo => isMatchingSearchTerm(store.searchTerm().trim().split(' '), todo, ['date', 'location', 'content']))),
  }))
)
