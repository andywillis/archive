// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Date from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Date date="020206" />
    </div>
    , div
  );
});
