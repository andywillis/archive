# FMP notes application

Notes application using local-storage.

## To serve the application

`npm run serve`

This will install a local server which will then serve the pre-built application on `http://localhost:5000`.

## Running tests

`npm test`

## Requirements

This application aims to satisfy both JavaScript and UI/UX requirements.

### UI/UX

✔ Should be responsive, working on mobile, tablet and desktop.

✔ The UI should be intuitive

✔ When a note is clicked then I only see the selected notes content in a modal

✔ When I close a modal then I see the list of notes

✔ Please don’t use a CSS framework.

- Please explain your UI/UX choices

I use Google Keep on a regular basis and its a notes application with a good user interface so it seemed reasonable (if perhaps lacking in originality) to look to that for ideas. Particularly since the code requirements for this test seem to mimic the Keep functionality.

I decided to keep it simple - using Flexbox to ensure the app worked properly for all devices. I would have probably swapped out the modal for something better, but for this test decided to keep to the stated requirements.

### JavaScript

✔ Data should persist in some form. Local storage is great, don't need to store in a database.

✔ Like to see reliable and safe handling of data

Data is encoded when it is saved.

✔ At FMP we love tests, use whatever testing you feel appropriate and be prepared to justify your choices.

I added some basic tests with Jest, but I understand that these can be massively improved.

## Notes

Some ideas on how to improve the application

* Be able to edit notes
* Be able to successfully add/render markup as well as text
* Change the modals to something less intrusive - have the note expand in the window instead of creating its own window which I don't think works as well on mobile.