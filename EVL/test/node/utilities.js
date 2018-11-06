/* global expect: true */

var expect = require('chai').expect;
var vendaPath = '../../src/core/modules/utilities/';
var modulePath = 'utilities';
var Utilities = require(vendaPath + modulePath);

describe('Utilities', function () {

  it('should be an object', function () {
    expect(Utilities).to.be.instanceof(Object);
  });

});
