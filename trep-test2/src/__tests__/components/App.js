import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import App from '../../components/App';

import configureStore from '../../store/configureStore';

let store = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,div
  );
});
