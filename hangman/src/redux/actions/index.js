export const addMatch = (letter) => {
  return {
    type: 'ADD_MATCH',
    letter
  };
};

export const incrementStrikes = () => {
  return {
    type: 'INCREMENT_STRIKES'
  };
};

export const resetBoard = () => {
  return {
    type: 'RESET_BOARD'
  };
};

export const updateCompleted = () => {
  return {
    type: 'UPDATE_COMPLETED'
  };
};

export const setFetchError = (bool) => {
  return {
    type: 'SET_FETCH_ERROR',
    hasErrored: bool
  };
};

export const setFetchLoader = (bool) => {
  return {
    type: 'SET_FETCH_LOADER',
    isLoading: bool
  };
};

export const setFetchSuccess = (data) => {
  return {
    type: 'SET_FETCH_SUCCESS',
    word: data.toUpperCase()
  };
};

export const fetchData = (url) => {
  return (dispatch) => {
    dispatch(setFetchLoader(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then(response => response.text())
      .then(data => dispatch(setFetchSuccess(data)))
      .then(() => dispatch(setFetchLoader(false)))
      .catch(() => dispatch(setFetchError(true)));
  };
};
