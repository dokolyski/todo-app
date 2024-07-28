import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { UiAddTodoComponent } from './ui-add-todo.component';

const selectors = {
  submitButton: 'button[type="submit"]',
  formFields: {
    date: 'input[name="date"]',
    location: 'input[name="location"]',
    content: 'textarea[name="content"]'
  }
};

describe('UiAddTodoComponent', () => {
  let spectator: Spectator<UiAddTodoComponent>;
  const createComponent = createComponentFactory(UiAddTodoComponent);

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('submit button', () => {
    it('should be disabled when the form is invalid', () => {
      // Arrange, Act & Assert
      // by default form is empty so it is invalid
      expect(selectors.submitButton).toBeDisabled();
    });

    it('should be enabled when the form is valid', () => {
      // Arrange & Act
      spectator.typeInElement('2022-01-01T10:00', selectors.formFields.date);
      spectator.typeInElement('location', selectors.formFields.location);
      spectator.typeInElement('content', selectors.formFields.content);

      // Assert
      expect(spectator.query('button[type="submit"]')).not.toBeDisabled();
    });
  });

  describe('submit event', () => {
    it('should emit the form value', () => {
      // Arrange
      const createTodoSpy = jest.spyOn(spectator.component.createTodo, 'emit');

      // Act
      spectator.typeInElement('2022-01-01T10:00', selectors.formFields.date);
      spectator.typeInElement('location', selectors.formFields.location);
      spectator.typeInElement('content', selectors.formFields.content);
      spectator.click(selectors.submitButton);

      // Assert
      expect(createTodoSpy).toHaveBeenCalledWith({
        date: '2022-01-01T10:00',
        location: 'location',
        content: 'content'
      });
    });
  })
});
