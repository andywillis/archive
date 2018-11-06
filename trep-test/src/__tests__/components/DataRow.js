import React from 'react';
import ReactDOM from 'react-dom';
import DataRow from '../../components/DataRow';

const item = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DataRow item={item} />, div);
});
