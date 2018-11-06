import React from 'react';
import ReactDOM from 'react-dom';
import SortBar from '../../components/SortBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SortBar />, div);
});
