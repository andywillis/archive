import React from 'react';
import ReactDOM from 'react-dom';
import FilterBar from '../../components/FilterBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterBar />, div);
});
