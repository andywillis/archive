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
    entries: data.entries,
    links: data.links
  };
};

export const fetchData = (url) => {
  return (dispatch) => {
    dispatch(setFetchLoader(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        dispatch(setFetchLoader(false));
        return response;
      })
    .then(response => response.json())
    .then(data => dispatch(setFetchSuccess(data)))
    .catch(() => dispatch(setFetchError(true)));
  };
};
