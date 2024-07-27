import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {outputFromObservable} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-ui-todo-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ui-todo-filter.component.html',
  styleUrl: './ui-todo-filter.component.scss'
})
export class UiTodoFilterComponent {
  readonly searchTermControl = inject(NonNullableFormBuilder).control('');
  readonly searchTermChanged = outputFromObservable(this.searchTermControl.valueChanges);
}
