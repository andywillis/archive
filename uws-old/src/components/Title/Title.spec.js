// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Title from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Title link="1" type="entry">Title</Title>
    </div>
  , div);
});
