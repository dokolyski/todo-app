import {createComponentFactory, Spectator} from '@ngneat/spectator/jest';
import {AppComponent} from './app.component';

const selectors = {
  mobileMenu: '#mobile-menu',
  mobileMenuButton: '#mobile-menu-button',
};

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory(AppComponent);

  beforeEach(() => {
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
      // Arrange & Act & Assert
      expect(spectator.query(selectors.mobileMenu)).not.toExist();
    });

    it('should show the mobile menu after clicking the menu button', () => {
      // Arrange & Act
      spectator.click(selectors.mobileMenuButton);
      // Assert
      expect(spectator.query(selectors.mobileMenu)).toBeVisible();
    });

    it('should hide the mobile menu after clicking the menu button again', () => {
      // Arrange & Act
      spectator.click(selectors.mobileMenuButton);
      spectator.click(selectors.mobileMenuButton);
      // Assert
      expect(spectator.query(selectors.mobileMenu)).not.toBeVisible();
    });
  });
});
