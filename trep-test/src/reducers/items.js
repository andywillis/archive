import {
  SortOrder,
  SET_STARFILTER,
  SET_SORTORDER,
  ITEMS_IS_LOADING,
  ITEMS_FETCH_DATA_SUCCESS,
  ITEMS_HAS_ERRORED
} from '../actions/items';

const initialState = {
  sortOrder: SortOrder.SORT_BY_NAME,
  pageLimit: 15,
  pageNumber: 0,
  starFilter: [1, 2, 3, 4, 5],
  items: []
}

export const itemsHasErrored = (state = false, action) => {
  switch (action.type) {
    case ITEMS_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}

export const itemsIsLoading = (state = false, action) => {
  switch (action.type) {
    case ITEMS_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}

export const items = (state = initialState, action) => {

  switch (action.type) {

    case ITEMS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        items: action.items
      });

    case SET_STARFILTER:
      return Object.assign({}, state, {
        starFilter: action.starFilter
      });

    case SET_SORTORDER:
      return Object.assign({}, state, {
        sortOrder: action.sortOrder
      });

    default:
      return state;
  }

}
