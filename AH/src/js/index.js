import request from './request';
import { codeblock } from './interface';
import { qs, qsa } from './dom';
import { formatJSON, formatXML } from './formatData';

/**
 * Renders the code block
 * @param  {String} data Data from the XMLHTTPRequest
 * @param  {String} type Data type (JSON/XML)
 */
function renderCode(data, type) {
  let output;
  if (type === 'json') output = codeblock(formatJSON(JSON.parse(data.response), 2));
  if (type === 'xml') output = codeblock(formatXML(data.response));
  let node = qs('.response');
  node.innerHTML = renderHeader(data, type) + output;
  hljs.highlightBlock(node);
}

/**
 * Render the XMHTTPHeader information (partial)
 * @param  {Object} data XMHTTPRequent object
 * @param  {String} type Data type
 * @return {String}      HTML
 */
function renderHeader(data, type) {
  return [
    ['HTTP', data.status, 'OK'].join(' '),
    ['Content-Type:', 'application/', type].join(' ')
  ].join('<br/>');
}

/**
 * Render the path block
 * @param  {String} url URL
 */
function renderPath(url) {
  qs('.url').innerHTML = 'GET ' + url;
}

/**
 * Gets data using the Promise constructor and the request module
 * @param  {String} type Data type (JSON/XML)
 */
function getData(type) {

  type = type || 'json';
  let url = 'data/' + type;

  request(url, function (data) {
    renderPath(url);
    renderCode(data, type);
  });
}

/**
 * Runs when the DOM content has loaded.
 * Adds an event listener to the dropdown and
 * runs getData() for the first time
 */
function init() {

  qs('.selector').addEventListener('change', function () {
    let type = this.options[this.selectedIndex].value;
    getData(type);
  });

  getData();

}

document.addEventListener('DOMContentLoaded', init);