const initialState = {
  accessToken: '',
  error: {}
};

function user(state = initialState, action) {

  switch (action.type) {

    case 'RESET_AUTH_ERROR': {
      return { ...state, error: {} };
    }

    case 'SET_ACCESS_TOKEN': {
      const { accessToken } = action;
      return {
        ...state,
        accessToken,
        error: {}
      };
    }

    case 'SET_ACCESS_ERROR': {
      const { statusCode, message } = action;
      return {
        ...state,
        accessToken: '',
        error: { statusCode, message }
      };
    }

    default: return state;

  }

}

export default user;
