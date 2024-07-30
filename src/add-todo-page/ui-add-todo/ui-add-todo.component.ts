import { Component, inject, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DateTimeString } from '../../shared/types/date-time-string.type';

export type UiAddTodoFormValue = ReturnType<
  typeof UiAddTodoComponent.prototype.form.getRawValue
>;

@Component({
  selector: 'app-ui-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ui-add-todo.component.html',
  styleUrl: './ui-add-todo.component.scss',
})
export class UiAddTodoComponent {
  readonly form = inject(NonNullableFormBuilder).group({
    date: ['' as DateTimeString, Validators.required],
    location: ['', Validators.required],
    content: ['', Validators.required],
  });
  readonly cancelCreation = output();
  readonly createTodo = output<UiAddTodoFormValue>();
}
