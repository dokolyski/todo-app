import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import {PATHS} from "./app.routes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly faGhost = faGhost;
  readonly PATHS = PATHS;
  readonly mobileMenuOpened = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpened.update((prevValue) => !prevValue);
  }
}
