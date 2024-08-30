import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { UiTodoFilterComponent } from './ui-todo-filter.component';

const selectors = {
  searchInput: '#filterInput',
};

describe('UiTodoFilterComponent', () => {
  let spectator: SpectatorHost<UiTodoFilterComponent>;
  const createHost = createHostFactory(UiTodoFilterComponent);
  const searchTermChanged = jest.fn();

  beforeEach(() => {
    spectator = createHost(
      '<app-ui-todo-filter (searchTermChanged)="searchTermChanged($event)"/>',
      { hostProps: { searchTermChanged } },
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should emit search term when search term changes', () => {
    // Arrange
    const searchTerm = 'search term';

    // Act
    spectator.typeInElement(
      searchTerm,
      spectator.query(selectors.searchInput)!,
    );

    // Assert
    expect(searchTermChanged).toHaveBeenCalledWith(searchTerm);
  });
});
