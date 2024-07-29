import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { PATHS } from './app.routes';
import { TodoStore } from '../data-access-todo';
import { TODO_LIST_MOCK } from '../data-access-todo/__mocks__/todo-list.mock';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _todoStore = inject(TodoStore);
  readonly faGhost = faGhost;
  readonly PATHS = PATHS;
  readonly mobileMenuOpened = signal(false);
  readonly upcomingTodosNumber = this._todoStore.upcomingTodosNumber;

  constructor() {
    this._todoStore.setTodoList(TODO_LIST_MOCK);
  }

  toggleMobileMenu() {
    this.mobileMenuOpened.update((prevValue) => !prevValue);
  }
}
