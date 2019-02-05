import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import { createStore, applyMiddleware, compose } from 'redux';
import { loadUser, saveUser } from './localStorage';

import rootReducer from '../reducers';

const localUser = loadUser();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  localUser,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(throttle(() => {
  saveUser({
    user: store.getState().user
  });
}), 1000);

export default store;
