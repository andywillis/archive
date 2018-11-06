const fetchLoading = (state = false, action) => {
  switch (action.type) {
    case 'SET_FETCH_LOADER':
      return action.isLoading;
    default:
      return state;
  }
};

export default fetchLoading;
