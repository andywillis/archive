const initialState = {
  entries: [],
  links: [],
  pageLimit: 4
};

const journal = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_FETCH_SUCCESS':
      return Object.assign({}, state, {
        entries: action.entries,
        links: action.links
      });

    default:
      return state;
  }

};

export default journal;
