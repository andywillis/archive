import { expect } from 'chai';
import { codeblock } from '../src/js/interface';

let parsedJSON = '[{"name":"Andy"}]';
let stringifiedJSON = JSON.stringify(parsedJSON, null, 2);
let output = '<pre><code>' + stringifiedJSON + '</code></pre>';

describe('codeblock', function () {

  it('the output should be a string', function () {
    expect(codeblock(stringifiedJSON)).to.be.a('string');
  });

  it('should render an HTML codeblock', function () {
    expect(codeblock(stringifiedJSON)).to.equal(output);
  });

});
