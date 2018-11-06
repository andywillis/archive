# andywillis-test

[See the original test code working on Heroku](https://mfaw.herokuapp.com/)

## The code

1) Download the original test code, and unzip to a folder called _andywillis-test_.

https://github.com/andywillis/andywillis-test/archive/v1.0.zip

(Note: you are downloading an archived copy of the test because I made some improvements to the code over the weekend. If you want to see the current code simply [clone this repo](git@github.com:andywillis/andywillis-test.git). The improvements included an item view, and improved mobile experience, but this obviously took me over the 4-6 hours.)

2) Change to that folder and install the production dependencies:

`npm install express request request-promise`

3) Run the express server:

`NODE_ENV=production node server.js`

4) Open the listing page on _http://localhost:3001/_

## Instructions

* __Create a new folder for the test__ &#10004;
* __Start a new NPM project and call it "[yourname]-test"__ &#10004;
* __Install your favourite server framework (preferably Express or Koa)__ &#10004;
I used Express.
* __Install the PUG templating engine.__ &#10004;
Because of the way that I developed this (_create-react-app_), and because it's nice to deploy to a live site (Heroku), I didn't need to use a Pug template because Express can use the _build/index.html_ file instead (_server.js_, lines 11-13). However, for completeness, I created an index Pug template in _views_, and showed the way the template would be used in a commented section of _server.js_ (lines 15-16, 28).
* __Set up a simple server with one index view__ &#10004;
See above.
* __Set up React.js in the index view you created__ &#10004;
I used _create-react-app_ so React is included in  _build/index.html_ that _server.js_ uses.
* __Using your favourite way of fetching data from a CORS API, fetch the JSON feed.__ &#10004;
I used _request-promise_ on the server, and _fetch_ in the React application.
* __Create a tile view with the products you fetch.__ &#10004;
Due to time constrainsts I decided to only create the grid, and the method of switching between two/three columns. This meant that I could keep the application state within the _Grid_ component rather than add Redux which, in this instance, would have been overkill.

### Notes
* __Feel free to create the project with any task runner you want. NPM scripts with Webpack, Grunt or Gulp are all acceptable.__ &#10004;
Using _create-react-app_ means that all the hassle and quirks of having to deal with _webpack_ are removed - as a developer I can just concentrate on the code. It also means I can upload to Heroku very easily.
* __Use Express or Koa__ &#10004;
The latest version of Express
* __Your Node.js version should be 6.x__ &#10004;
v8.1.4
* __React.js should be the latest__
_create-react-app_ uses the the latest version of React
* __As this is a data-driven application, feel free to use a framework if you like (Flux, Redux, Relay or anything you are familiar with, are all acceptable)__
See above for my reason for not adding Redux to this application.
