import { Routes } from '@angular/router';
import { UiWelcomeComponent } from '../welcome-page';

export const PATHS = {
  todoListPage: 'list',
  addTodoPage: 'add',
  welcomePage: '',
} as const;

export const routes: Routes = [
  {
    path: PATHS.welcomePage,
    pathMatch: 'full',
    component: UiWelcomeComponent,
  },
  {
    path: PATHS.todoListPage,
    loadComponent: () =>
      import('../todo-list-page').then((m) => m.FeatureTodoListComponent),
  },
  {
    path: PATHS.addTodoPage,
    loadComponent: () =>
      import('../add-todo-page').then((m) => m.FeatureAddTodoComponent),
  },
  {
    path: '**',
    redirectTo: PATHS.welcomePage,
  },
];
