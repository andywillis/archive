// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Blockquote from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Blockquote html="<h1>Title</h1>" />
    </div>
  , div);
});
