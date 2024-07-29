import { Component, inject } from '@angular/core';
import {
  UiAddTodoComponent,
  UiAddTodoFormValue,
} from '../ui-add-todo/ui-add-todo.component';
import { Router } from '@angular/router';
import { PATHS } from '../app/app.routes';
import { TodoStore } from '../data-access-todo';

@Component({
  selector: 'app-feature-add-todo',
  standalone: true,
  imports: [UiAddTodoComponent],
  templateUrl: './feature-add-todo.component.html',
  styleUrl: './feature-add-todo.component.scss',
})
export class FeatureAddTodoComponent {
  private readonly _router = inject(Router);
  private readonly _todoStore = inject(TodoStore);

  cancelTodoCreation() {
    this._router.navigateByUrl(PATHS.welcomePage);
  }

  createTodo(payload: UiAddTodoFormValue) {
    this._todoStore.addTodo({
      date: payload.date,
      location: payload.location,
      content: payload.content,
    });
    this._router.navigateByUrl(PATHS.todoListPage);
  }
}
