import Preact, { h } from 'preact';
import test from 'ava';

import Chart from '../src/components/Chart/index.js';

const fetchMock = require('fetch-mock');

// set up DOM
document.body.innerHTML = '<div id="gauge"></div>';
const chart = new Chart('#gauge');

test('chart instance is an object', (t) => {
  t.plan(1);
  t.is(typeof chart, 'object');
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