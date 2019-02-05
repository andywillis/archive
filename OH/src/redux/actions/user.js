// export function setFetchError(bool) {
//   return {
//     type: 'SET_FETCH_ERROR',
//     hasErrored: bool
//   };
// }

// export function setFetchLoader(bool) {
//   return {
//     type: 'SET_FETCH_LOADER',
//     isLoading: bool
//   };
// }

export function setAccessToken(data) {
  const { id: accessToken } = data;
  return {
    type: 'SET_ACCESS_TOKEN',
    accessToken
  };
}

export function setAccessError(data) {
  const { statusCode, message } = data;
  return {
    type: 'SET_ACCESS_ERROR',
    statusCode,
    message
  };
}

export function resetAuthError() {
  return {
    type: 'RESET_AUTH_ERROR'
  };
}

// const endpoint = 'https://api-test.oxheyhall.com/v1/admin/accounts/login';

// function getParams({ username, password }) {
//   return {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ username, password })
//   };
// }

// export function authUser(params) {
//   return async (dispatch) => {
//     dispatch(setFetchLoader(true));
//     try {
//       const response = await fetch(endpoint, getParams(params));
//       dispatch(setFetchLoader(false));
//       const data = await response.json();
//       if (data.error) {
//         const { error } = data;
//         dispatch(setAccessError(error));
//       } else {
//         dispatch(setAccessToken(data));
//       }
//     } catch (e) {
//       dispatch(setFetchError(true));
//       dispatch(setFetchLoader(false));
//     }
//   };
// }
