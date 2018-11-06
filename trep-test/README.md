# andy willis trep-test

Redux / React application to allow the filtering and sorting of records.

__[See the code working on Heroku](http://trtest.herokuapp.com/)__

## The code

#### Clone original test code

`git clone git@github.com:andywillis/trep-test.git`

#### Change to that folder and install the production dependencies

`npm install express`

#### Run the express production server

`NODE_ENV=production node server.js`

#### Open the listing page

`http://localhost:3001/`

## Notes

* Used `create-react-app` to scaffold the app, for hot-loading changes, quick build process, and basically remove the need to faff around with setting up webpack. `create-react-app` also uses `Jest` for testing.
* Express for the back-end.
* Currently only filtering on stars has been implemented.
* All hotel data is loaded into redux, but only 15 records are displayed at anyone time. Unfortunately I didn't have time to implement the record paging.
* Responsive layout for desktop and mobile.
* There are some tests in `src/__tests__`. If you want to run them first remove `package-lock.json`, then the `node_modules` folder, then `npm install --only-production`. Once npm has completed the installation `npm run test`.