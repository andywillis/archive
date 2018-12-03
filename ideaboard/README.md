# Idea board

## Test site

[https://uws-cstest.herokuapp.com/](https://uws-cstest.herokuapp.com/)

## Run the local production build

`npm install && npm run serverprod`

Open on `localhost:3000`.

## Tests

`npm install && npm test`

## Notes

* I used my own build framework rather than CRA as it's a little thinner.

* The instructions of a "created/updated" timestamp were a little unclear. Did they mean a) one single timestamp that is constantly updated or b) a separate timestamp for the creation date/time, and another for the updated date/time. I chose a).

* Uses a mix of flex/CSS grid in CSS modules.

✔ Page should be fully responsive.

✔ Each idea tile should contain a title and description, which is editable, as well as created/updated time.

✔ New ideas should have the title field focused to prompt user to begin typing.

✔ Add the ability to sort ideas by creation date or alphabetically

✔ Utilise the localStorage API to persist current state when the page is refreshed.

✔ Add a character countdown as the user is approaching the limit of their description text.

✔ Add an unobtrusive notification when an update is made to a tile.
