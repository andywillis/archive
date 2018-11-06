const initialState = {
  favourites: []
};

const user = (state = initialState, action) => {

  switch (action.type) {

    case 'ADD_FAVOURITE':
      return {
        ...state,
        favourites: [...state.favourites, action.id]
      };

    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        favourites: state.favourites.filter(el => el !== action.id)
      };

    default:
      return state;
  }

};

export default user;
