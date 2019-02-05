export function setFetchError(bool) {
  return {
    type: 'SET_FETCH_ERROR',
    hasErrored: bool
  };
}

export function setFetchLoader(bool) {
  return {
    type: 'SET_FETCH_LOADER',
    isLoading: bool
  };
}
