# AH test

Interface with syntax highlighting for the code. Allows a user to choose between XML/JSON formats.

* Small expressjs backend with REST API (run `node index` - localhost:5000)
* ES6 JS transformed, sourcemapped, and minified with babelify/browserify to public/js (run with `npm run bundlejs`)
* Split into modules
  * `request` - performs the XMHTTPRequest
  * `interface` - provides HTML for various UI elements (only codeblock atm)
  * `dom` - DOM helpers
  * `formatData` - helpers to format incoming data to the correct format for display
  * `promise` - used in a previous commit but removed for a simplified request module with a callback
* CSS (utilising skeleton.css for small responsive styles) minified to public/css (run with `npm run bundlecss`)
* Small number of tests also in ES6 (run with `npm test`).
* No libraries