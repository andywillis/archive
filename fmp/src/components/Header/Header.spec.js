// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Header from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Header />
    </div>
    , div);
});
