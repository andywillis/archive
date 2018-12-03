## Geckoboard Gauge Test (Preact version)

This is the same functionality as [the previous geckoboard repo](https://github.com/andywillis/geckoboard), but using Preact to render the component instead of just vanilla JS.

## Installation

`npm install`

then

`npm run serverprod` to serve the existing app on `3000`

or

`npm run prod` to rebuild the app and serve it up on `3000`.

## Testing

Install the required modules: `npm install`.

`npm test` will run the [`ava`](https://github.com/avajs/ava) tests.

## Notes

Added after I familiarised myself with the Preact build requirements. Final compressed JS & CSS output is around 100K without bundle splitting, around 8x larger than [the vanilla JS version](https://github.com/andywillis/geckoboard), but that's still considerably smaller than bundling with React. It uses CSS modules which is always a bonus.