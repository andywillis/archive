import test from 'ava';
const fetchMock = require('fetch-mock');

import Chart from '../src/Chart';

// set up DOM
document.body.innerHTML = '<div id="gauge"></div>';
const chart= new Chart('#gauge');

test('chart instance is an object', (t) => {
  t.plan(1);
  t.is(typeof chart, 'object');
});

test('state DOM has the right elements', (t) => {
  const { dom } = chart.state;
  const elements = [ 'el' ];
  t.is(Object.keys(dom).every(key => elements.includes(key)), true);
});

test('browserStyle is recognised', (t) => {
  const { browserStyle } = chart.state;
  const styles = [ 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform', 'transform' ];
  t.plan(2);
  t.is(typeof browserStyle, 'string');
  t.is(styles.includes(browserStyle), true);
});

test('getData works', async (t) => {
  const endpoint = 'https://widgister.herokuapp.com/challenge/frontend';
  fetchMock.get(endpoint, { min: 132, value: 179, max: 26, format: "currency", unit: "CHF" });
  const res = await chart.getData(endpoint);
  t.is(res.unit, 'CHF');
  fetchMock.restore();
});