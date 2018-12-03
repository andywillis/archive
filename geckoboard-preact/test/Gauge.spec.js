import Preact, { h } from 'preact';
import test from 'ava';

const fetchMock = require('fetch-mock');

import Gauge from '../src/components/Gauge/index.js';

// set up DOM
document.body.innerHTML = '<div id="gauge"></div>';
const gauge = new Gauge('#gauge');

test('chart instance is an object', (t) => {
  t.plan(1);
  t.is(typeof gauge, 'object');
});

test('getData works', async (t) => {
  const endpoint = 'https://widgister.herokuapp.com/challenge/frontend';
  fetchMock.get(endpoint, { min: 132, value: 179, max: 26, format: "currency", unit: "CHF" });
  const res = await gauge.getData(endpoint);
  t.is(res.unit, 'CHF');
  fetchMock.restore();
});

test('Renders correctly', (t) => {
  gauge.render();
  const button = document.querySelector('.button');
  t.is(typeof button, 'object');
});
