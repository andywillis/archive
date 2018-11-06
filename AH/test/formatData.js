import { expect } from 'chai';
import { formatJSON, formatXML } from '../src/js/formatData';

let parsedJSON = JSON.parse('[{"name":"Andy"}]');
let stringifiedJSON = JSON.stringify(parsedJSON, null, 2);
let xml = '<?xml version="1.0" encoding="UTF-8" ?><person><name>Andy</name></person>';
let formattedXML = '&lt;?xml version="1.0" encoding="UTF-8" ?&gt;&lt;person&gt;&lt;name&gt;Andy&lt;/name&gt;&lt;/person&gt;';

describe('formatJSON', function () {

  it('the output should be a string', function () {
    expect(formatJSON(parsedJSON, 2)).to.be.a('string');
  });

  it('should format JSON with an indendation of 2 spaces', function () {
    expect(formatJSON(parsedJSON, 2)).to.equal(stringifiedJSON);
  });

});

describe('formatXML', function () {

  it('the output should be a string', function () {
    expect(formatXML(xml)).to.be.a('string');
  });

  it('should format XML for HTML display', function () {
    expect(formatXML(xml)).to.equal(formattedXML);
  });
});
