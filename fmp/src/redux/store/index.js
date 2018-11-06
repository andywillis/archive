// Dependancies
import throttle from 'lodash.throttle';
import { createStore, compose } from 'redux';
import { loadNotes, saveNotes } from './localStorage';

// Redux
import rootReducer from '../reducers';

// Local Storage
const localNotes = loadNotes();

// FF redux viewer addon
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  localNotes,
  composeEnhancers()
);

store.subscribe(throttle(() => saveNotes(store.getState(), 1000)));

export default store;
