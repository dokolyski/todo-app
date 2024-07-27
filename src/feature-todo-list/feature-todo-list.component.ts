import {Component, computed, inject} from '@angular/core';
import {TodoStore} from "../data-access-todo";
import {UiTodoFilterComponent} from "../ui-todo-filter/ui-todo-filter.component";
import {UiTodoListComponent} from "../ui-todo-list/ui-todo-list.component";

@Component({
  selector: 'app-feature-todo-list',
  standalone: true,
  imports: [
    UiTodoFilterComponent,
    UiTodoListComponent
  ],
  templateUrl: './feature-todo-list.component.html',
  styleUrl: './feature-todo-list.component.scss'
})
export class FeatureTodoListComponent {
  constructor() {
    this._todoStore.setSearchTerm('');
  }

  private readonly _todoStore = inject(TodoStore);
  readonly filteredTodos = computed(() => (this._todoStore.filteredTodos()));

  searchTermChanged(searchTerm: string) {
    this._todoStore.setSearchTerm(searchTerm);
  }
}
