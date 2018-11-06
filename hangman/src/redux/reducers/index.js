import { combineReducers } from 'redux';

import fetchErrored from './fetchErrored';
import fetchLoading from './fetchLoading';
import hangman from './hangman';

export default combineReducers({
  hangman,
  fetchErrored,
  fetchLoading
});
