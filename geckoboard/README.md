## Geckoboard Gauge Test

Go in to the `src` folder and open `index.html`.

## Testing

Install the required modules: `npm install`.

`npm test` will run the [`ava`](https://github.com/avajs/ava) tests.

## Notes

I decided at the start of this test that I didn't want to introduce any complexity where it wasn't needed. Usually I would have used my React boilerplate, but that has a significant performance hit of the additional dependencies, as well as the overhead of building different development and production code, and it's pretty much overkill for a test that only deals with one component.

Of course, should you invite me in for an interview, you'll probably want me to extend the code. That would be easier with React.

Nevertheless, I chose to use a couple of simple JS classes. The first `Chart` provides the basic chart methods (`getData`for example), and `Gauge` extends `Chart` to add functionality specific to that type of chart. Different chart types can be extended from `Chart` in a similar way.

I've also completed the work without using `Babel` to transpile the code. This is a) an unneeded additional compilation step, and 2) adds unnecessary weight to the production code. This means that this code is only suitable for modern browsers/smart phones (there's a responsive breakpoint at 800px), but is only 12k unminified for the JS and CSS.

### Errors

The code catches both server errors, and data validation issues. Ideally I would have liked the user to be notified of both error types but, currently, the user is only notified of the invalid code; the server error is only logged silently in the console.

### More time?

I would use `Preact` and CSS modules over `React`. `Preact` has a low code footprint more suited for this type of work.

(Note: [__A Preact version is also available__](https://github.com/andywillis/geckoboard-preact). It has about 8x the code-footprint of this repo, and involved a lot more faffing about. But it has CSS modules.)

## Addtional information

* Currency symbol data taken from [currency-symbol-map]
(https://github.com/bengourley/currency-symbol-map)

* CSS modified from [`https://bl.ocks.org/sathomas/a8f1cc13c8b4fcb63c6f`](https://bl.ocks.org/sathomas/a8f1cc13c8b4fcb63c6f).