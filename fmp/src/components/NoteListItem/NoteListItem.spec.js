// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// React
import NoteListItem from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <NoteListItem id="1" title="Title" text="Text" />
    </div>
    , div);
});
