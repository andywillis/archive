// Dependancies
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { createStore, applyMiddleware, compose } from 'redux';
import { loadSignUps, saveSignUps } from './localStorage';

import rootReducer from '../reducers';

const localSignUps = loadSignUps();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  localSignUps,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(throttle(() => {
  saveSignUps({
    signUps: store.getState().signUps
  });
}), 1000);

export default store;
