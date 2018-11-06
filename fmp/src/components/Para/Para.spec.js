// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Para from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Para html="Test" />
    </div>
    , div);
});
