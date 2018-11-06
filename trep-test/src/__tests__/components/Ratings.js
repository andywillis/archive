import React from 'react';
import ReactDOM from 'react-dom';
import Ratings from '../../components/Ratings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ratings />, div);
});
