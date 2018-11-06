import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import configureStore from './store/configureStore';

import './style/index.css';

let store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <App store={store} />
  </Provider>
), document.getElementById('root'));
