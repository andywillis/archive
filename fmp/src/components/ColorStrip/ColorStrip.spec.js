// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import ColorStrip from './index';

function handleSwatchChange() {
  console.log('Test');
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <ColorStrip
        defaultColor="blue"
        handleSwatchChange={handleSwatchChange}
      />
    </div>
    , div
  );
});
