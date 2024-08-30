# Solution
## General approach
### Architecture
The project's file structure is organized first by the scope/domain (like add-todo-page & todo-list-page) and then by the type/layer (ui & feature).\
It mimics the nx monorepo type/layer naming conventions, with folders names starting with a type name.

### Testing
I decide to change test runner from karma to jest, because jest is faster.\
I used spectator library to wrap TestBed and make test initialization easier.\
For each task I provided unit tests which should cover most of the cases.

### State management
On the bottom level we have data-access folder, which contains a store definition for managing the todos state.\
It utilizes the ngrx's signal store, which make the state management really easy and intuitive.

### Tailwind
I used tailwind's @layer to reuse the styling in easy way. It's a great way to keep the styling consistent and DRY.

### Change detection
The whole application is using signals, so it could be zoneless, but in version 18.1 Angular still doesn't support zoneless SSR application.\
(https://angular.dev/errors/NG05000)

## Differences between task description and implementation

I decide to keep Todo entity as simple as possible and not enhance it with properties like `display` or `latitude` & `longitiude`.\
To achieve the searching functionality I simply implemented `filteredTodos` computed signal.\
And because `latitude` & `longitude` are used only for loading the temperature for the location, 
I just passed them directly to the next api call and not saved it in the entity.\
Also included an hour in the todo definition, so the badge with upcoming todos is taking time into account.


## Worth mentioning tricks :)

**ReturnType<typeof UiAddTodoComponent.prototype.form.getRawValue>** an elegant way to access an inferred form data type.\
**StringKeys** *and* **isMatchingSearchTerm** my showoff of conditional types skills ;) It allows to make isMatchingSearchTerm generic and type safe at the same time
