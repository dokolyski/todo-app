import {createComponentFactory} from '@ngneat/spectator/jest';
import {AppComponent} from './app.component';
import {PATHS, routes} from "./app.routes";
import {TodoStore} from "../data-access-todo";
import {signal} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter} from "@angular/router";

const selectors = {
  mobileMenu: '#mobile-menu',
  mobileMenuButton: '#mobile-menu-button',

  mobileGotoList: '#mobile-goto-list',
  mobileGotoAdd: '#mobile-goto-add',

  desktopGotoList: '#desktop-goto-list',
  desktopGotoAdd: '#desktop-goto-add',

  upcomingTodosBadge: '.badge'
};

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [provideRouter(routes), provideHttpClient()],
  });

  it('should create the app', () => {
    // Arrange
    const spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  describe('mobile menu', () => {
    it('on the start menu should not be visible', () => {
      // Assert
      const spectator = createComponent();
      expect(spectator.query(selectors.mobileMenu)).not.toExist();
    });

    it('should show the mobile menu after clicking the menu button', () => {
      // Arrange
      const spectator = createComponent();
      // Act
      spectator.click(selectors.mobileMenuButton);
      // Assert
      expect(spectator.query(selectors.mobileMenu)).toBeVisible();
    });

    it('should hide the mobile menu after clicking the menu button again', () => {
      // Arrange
      const spectator = createComponent();
      // Act
      spectator.click(selectors.mobileMenuButton);
      spectator.click(selectors.mobileMenuButton);
      // Assert
      expect(spectator.query(selectors.mobileMenu)).not.toBeVisible();
    });
  });

  describe('routing', () => {
    describe('desktop', () => {

      it('button navigating to the list page should has correct href', () => {
        // Arrange
        const spectator = createComponent();
        // Assert
        expect(spectator.query(selectors.desktopGotoList)!.getAttribute('href')).toEqual('/' + PATHS.todoListPage);
      })

      it('button navigating to the add page should has correct href', () => {
        // Arrange
        const spectator = createComponent();
        // Assert
        expect(spectator.query(selectors.desktopGotoAdd)!.getAttribute('href')).toEqual('/' + PATHS.addTodoPage);
      });
    });

    describe('mobile', () => {
      it('button navigating to the list page should has correct href', () => {
        // Arrange
        const spectator = createComponent();
        // open the mobile menu so it's buttons can be clicked
        spectator.click(selectors.mobileMenuButton);

        // Assert
        expect(spectator.query(selectors.mobileGotoList)!.getAttribute('href')).toEqual('/' + PATHS.todoListPage);
      })

      it('button navigating to the add page should has correct href', () => {
        // Arrange
        const spectator = createComponent();
        // open the mobile menu so it's buttons can be clicked
        spectator.click(selectors.mobileMenuButton);

        // Assert
        expect(spectator.query(selectors.mobileGotoAdd)!.getAttribute('href')).toEqual('/' + PATHS.addTodoPage);
      });
    });
  });

  describe('upcomingTodosNumber', () => {
    describe('when there are no upcoming todos', () => {
      it('should not display the badge', () => {
        // Arrange
        createComponent({
          providers: [{
            provide: TodoStore,
            useValue: {upcomingTodosNumber: signal(0)}
          }]
        });

        // Assert
        expect(selectors.upcomingTodosBadge).not.toExist();
      });
    });

    describe('when there are upcoming todos', () => {
      it('should display the number of upcoming todos in the badge', async () => {
        // Arrange
        createComponent({
          providers: [{
            provide: TodoStore,
            useValue: {upcomingTodosNumber: signal(3)}
          }]
        });

        expect(selectors.upcomingTodosBadge).toContainText('3');
      });
    });
  });
});
