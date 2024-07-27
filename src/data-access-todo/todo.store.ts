import {signalStore} from "@ngrx/signals";
import {withEntities} from "@ngrx/signals/entities";

export interface Todo {
  date: string;
  location: string;
  content: string;
  display: boolean;
}

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withEntities<Todo>()
)
