import { Routes } from '@angular/router';
import { UiWelcomeComponent } from '../ui-welcome/ui-welcome.component';

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
      import('../feature-todo-list').then((m) => m.FeatureTodoListComponent),
  },
  {
    path: PATHS.addTodoPage,
    loadComponent: () =>
      import('../feature-add-todo').then((m) => m.FeatureAddTodoComponent),
  },
  {
    path: '**',
    redirectTo: PATHS.welcomePage,
  },
];
