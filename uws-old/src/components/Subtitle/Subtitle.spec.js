// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Subtitle from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Subtitle txt="keyword" />
    </div>
  , div);
});
