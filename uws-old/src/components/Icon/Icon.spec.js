// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Icon from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Icon type="email" />
    </div>
  , div);
});
