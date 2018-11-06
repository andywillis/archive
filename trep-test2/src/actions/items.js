/*
 * ACTION TYPES
*/
export const SET_PAGE = 'SET_PAGE';
export const SET_STARFILTER = 'SET_STARFILTER';
export const SET_SORTORDER = 'SET_SORTORDER';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';

/*
 * other constants
 */

export const SortOrder = {
  SORT_BY_NAME: 'SORT_BY_NAME',
  SORT_BY_STARS: 'SORT_BY_STARS',
  SORT_BY_USERRATING: 'SORT_BY_USERRATING',
  SORT_BY_MINCOST: 'SORT_BY_MINCOST',
}

/*
 * ACTION CREATORS
*/
export const setStarFilter = (starFilter) => {
  return {
    type: SET_STARFILTER,
    starFilter
  }
}

export const setSortOrder = (sortOrder) => {
  return {
    type: SET_SORTORDER,
    sortOrder
  }
}

export function itemsHasErrored(bool) {
  return {
    type: ITEMS_HAS_ERRORED,
    hasErrored: bool
  };
}

export function itemsIsLoading(bool) {
  return {
    type: ITEMS_IS_LOADING,
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    items
  };
}

export function itemsFetchData(url) {
  return (dispatch) => {
    dispatch(itemsIsLoading(true));
    fetch(url)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        dispatch(itemsIsLoading(false));
        return response;
    })
    .then((response) => response.json())
    .then((items) => dispatch(itemsFetchDataSuccess(items.Establishments)))
    .catch(() => dispatch(itemsHasErrored(true)));
  };
}
