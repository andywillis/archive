import {
  setFetchProjectsSuccess,
  setFetchProjectSuccess,
  setAddProjectSuccess
} from '../actions/app';

import { setAccessToken, setAccessError } from '../actions/user';
import { setFetchError, setFetchLoader } from '../actions/api';

const endpoints = {
  login: 'https://api-test.oxheyhall.com/v1/admin/accounts/login',
  list: 'https://api-test.oxheyhall.com/v1/accounts/projects',
  view: 'https://api-test.oxheyhall.com/v1/admin/projects',
  add: 'https://api-test.oxheyhall.com/v1/admin/projects/new'
};

function getParams({ accessToken, verb, data }) {
  const params = {
    method: verb,
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  };
  return data ? { ...params, data } : params;
}

export default function REST({ type, params }) {
  return async (dispatch) => {

    dispatch(setFetchLoader(true));

    try {

      const response = await fetch(endpoints[type], getParams(params));

      dispatch(setFetchLoader(false));

      const data = await response.json();

      if (data.error) {
        const { error } = data;
        dispatch(setAccessError(error));
      } else {
        switch (type) {
          case 'login': dispatch(setAccessToken(data)); break;
          case 'list': dispatch(setFetchProjectsSuccess(data)); break;
          case 'view': dispatch(setFetchProjectSuccess(data)); break;
          case 'add': dispatch(setAddProjectSuccess(data)); break;
        }
      }

      dispatch(setFetchProjectsSuccess(data));

    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setFetchLoader(false));
    }
  };
}
