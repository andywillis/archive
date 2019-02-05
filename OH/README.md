# OH

## View

[https://gallant-meninsky-c1dc93.netlify.com/](https://gallant-meninsky-c1dc93.netlify.com/)

## Local development build

`npm install`

`npm run builddev`

## Requirements

✓ Allows a user sign in with a username and password

✓ Provides the logged in user with a list of Projects

✓ Bonus: Allow the logged in user to sort or filter the list of Projects

✓ Bonus: Allow a user to create a new Project through a form

✓ Bonus: Allow a user to choose a Project and see more details

Time taken: 8(ish)hrs

## Tech

* React
* Redux
* CS modules

## Development notes

### Layout

Responsive for iPad, and desktop.

### Allows a user sign in with a username and password

When the app loads the accessToken is loaded from session storage if it exists and added to the app state in redux. If it doesn't exist the user is redirected to the login page. Once the information is submitted either the user is redirected to the project list, or informed of an error in their login details, and asked to try again.

### Provides the logged in user with a list of Projects

For this demo the project list is produced only once. The data is stored in redux, and the table columns can be sorted. For ease of reading I've only included 4 columns. `budget` is formatted with `toLocaleString`.

### Allow the logged in user to sort or filter the list of Projects

Ordinarily the data would be served by the API for each change in state, but since we're dealing with a very small dataset I just wanted to see that the filtering worked without multiple hits to the server.

### Allow a user to create a new Project through a form

I've used a stripped down form for this demo with 2 inputs, `productName`, and `budget`.

### Allow a user to choose a Project and see more details

Available by clicking on the appropriate row in the project list. The project details are downloaded and stored in redux so if the same project details are clicked we save a trip to the server.

## Afterthoughts

1) I haven't included any tests. With the exception for developing APIs which tend to have much stricter specs, I rarely write tests until after the first iteration of coding has been done to shape the app. A that point I can take a step back and see what should be refactored, thrown out, or kept as it is.

2) We have 4 specific routes: login, and project add, list, & view. Two of these - login, and add - each have forms. As part of the refactor we could think about either creating a Form component, or, depending on the complexity of the information we want to capture, use a 3rd-party plugin like `redux-form`. Having used `redux-form` I would prefer to not use it until it became absolutely necessary. We could also extract the "back to project list" button out into a new Button component. Or, implement a UI library like Material-UI where these components come as standard.

3) There's some duplication in the `/redux/actions/app` code. Refactoring would involve mimicking the REST verbs (GET, POST etc) as functions, passing in a different set of params.

4) Currently this code doesn't check whether an projectId already exists (`/projects/{id}/exists`). Depending on how the ids are created (in my example spaces are replaced with hyphens, and all text is set to lowercase) this could be implemented in the "add project" form when the project name is added and the field defocused.

5) The next item to be implemented is record paging using `projects/count`.

6) Use SCSS to tidy up the CSS rules.