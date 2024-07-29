import {Component, input} from '@angular/core';
import {DateTimeString} from "../shared/types/date-time-string.type";
import {DatePipe} from "@angular/common";

export interface UiTodo {
  id: number;
  date: DateTimeString;
  location: string;
  content: string;
  temperature?: {
    value: number;
    unit: string;
  };
  temperatureLoadingError?: string;
}

@Component({
  selector: 'app-ui-todo-list',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './ui-todo-list.component.html',
  styleUrl: './ui-todo-list.component.scss'
})
export class UiTodoListComponent {
  readonly todos = input<UiTodo[]>([]);
}
