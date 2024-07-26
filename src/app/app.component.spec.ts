import {createComponentFactory, Spectator, SpectatorRouting} from '@ngneat/spectator/jest';
import {AppComponent} from './app.component';
import {provideRouter} from "@angular/router";
import {PATHS, routes} from "./app.routes";

const selectors = {
  mobileMenu: '#mobile-menu',
  mobileMenuButton: '#mobile-menu-button',

  mobileGotoList: '#mobile-goto-list',
  mobileGotoAdd: '#mobile-goto-add',

  desktopGotoList: '#desktop-goto-list',
  desktopGotoAdd: '#desktop-goto-add',
};

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [provideRouter(routes)],
  });

  beforeEach(() => {
    // Arrange
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  // it(`should have the 'todolist' title`, () => {
  //   expect(spectator.component.title).toEqual('todolist');
  // });

  xit('should render title', () => {
    expect(spectator.query('h1')?.textContent).toContain('Hello, todolist');
  });

  describe('mobile menu', () => {
    it('on the start menu should not be visible', () => {
      // Assert
      expect(spectator.query(selectors.mobileMenu)).not.toExist();
    });

    it('should show the mobile menu after clicking the menu button', () => {
      // Act
      spectator.click(selectors.mobileMenuButton);
      // Assert
      expect(spectator.query(selectors.mobileMenu)).toBeVisible();
    });

    it('should hide the mobile menu after clicking the menu button again', () => {
      // Act
      spectator.click(selectors.mobileMenuButton);
      spectator.click(selectors.mobileMenuButton);
      // Assert
      expect(spectator.query(selectors.mobileMenu)).not.toBeVisible();
    });
  });

  describe('routing', () => {
    beforeEach(async () => {
      await spectator.fixture.whenStable();
    })

    describe('desktop', () => {

      it('button navigating to the list page should has correct href', () => {
        // Assert
        expect(spectator.query(selectors.desktopGotoList)!.getAttribute('href')).toEqual(PATHS.todoListPage);
      })

      it('button navigating to the add page should has correct href', () => {
        // Assert
        expect(spectator.query(selectors.desktopGotoAdd)!.getAttribute('href')).toEqual(PATHS.addTodoPage);
      });
    });

    describe('mobile', () => {
      beforeEach(() => {
        // Arrange - by opening the mobile menu so it's buttons can be clicked
        spectator.click(selectors.mobileMenuButton);
      });

      it('button navigating to the list page should has correct href', () => {
        // Assert
        expect(spectator.query(selectors.mobileGotoList)!.getAttribute('href')).toEqual(PATHS.todoListPage);
      })

      it('button navigating to the add page should has correct href', () => {
        // Assert
        expect(spectator.query(selectors.mobileGotoAdd)!.getAttribute('href')).toEqual(PATHS.addTodoPage);
      })
    });
  });
});
