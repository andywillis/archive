// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import Blockquote from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const disabled = false;
  const location = '1';
  const type = 'left';

  ReactDOM.render(
    <div>
      <Blockquote
        type={type}
        location={location}
        disabled={disabled}
      />
    </div>
  , div);

});
