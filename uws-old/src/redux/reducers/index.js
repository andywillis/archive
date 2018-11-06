import { combineReducers } from 'redux';

import fetchErrored from './fetchErrored';
import fetchLoading from './fetchLoading';
import journal from './journal';
import user from './user';

export default combineReducers({
  journal,
  user,
  fetchErrored,
  fetchLoading
});
