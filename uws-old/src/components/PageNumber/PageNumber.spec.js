// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// React
import PageNumber from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const status = 'active';
  const number = 1;
  ReactDOM.render(
    <BrowserRouter>
      <PageNumber status={status} key="1" number={number} />
    </BrowserRouter>
  , div);
});
