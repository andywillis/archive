const fetchErrored = (state = false, action) => {
  switch (action.type) {
    case 'SET_FETCH_ERROR':
      return action.hasErrored;
    default:
      return state;
  }
};

export default fetchErrored;

