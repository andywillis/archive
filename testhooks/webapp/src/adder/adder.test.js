const adder = require('./index');
const utils = require('../utils');

const add2 = adder(14);

it('should return function ', () => {
  expect(utils.toType(add2)).toBe('function');
});
