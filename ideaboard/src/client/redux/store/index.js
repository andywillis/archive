import throttle from 'lodash.throttle';
import { createStore, compose } from 'redux';
import { loadIdeas, saveIdeas } from './localStorage';

import rootReducer from '../reducers';

const localIdeas = loadIdeas();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  localIdeas,
  composeEnhancers()
);

store.subscribe(throttle(() => saveIdeas(store.getState(), 1000)));

export default store;
