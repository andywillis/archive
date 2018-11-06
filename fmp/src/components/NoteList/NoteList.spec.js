// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

// React
import NoteListBox from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const notes = [];
  ReactDOM.render(
    <div>
      <Provider store={store}>
        <NoteListBox notes={notes} />
      </Provider>
    </div>
    , div);
});
