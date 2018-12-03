const initialState = {
  list: []
};

const signUps = (state = initialState, action) => {

  switch (action.type) {

    case 'ADD_SIGN_UP': {
      const { signUp } = action;
      return { ...state, list: [ ...state.list, signUp ] };
    }

    case 'UPDATE_STATUS': {
      const { id, status } = action;
      const entry = state.list.filter(entry => entry.id === id)[0];
      const updateEntry = { ...entry, status: status };
      const updatedList = [...state.list.filter(entry => entry.id !== id), updateEntry];
      return {...state, list: updatedList};
    }

    default:
      return state;
  }

};

export default signUps;
