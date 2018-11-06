// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Keyword from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Keyword keyword="keyword" />
    </div>
  , div);
});
