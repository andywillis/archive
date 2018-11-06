const initialState = {
  word: '',
  matches: [],
  strikes: 0,
  completed: false
};

const hangman = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_FETCH_SUCCESS':
      return {
        ...state,
        word: action.word
      };

    case 'INCREMENT_STRIKES':
      return {
        ...state,
        strikes: state.strikes + 1
      };

    case 'ADD_MATCH':
      return {
        ...state,
        matches: [...state.matches, action.letter]
      };

    case 'RESET_BOARD':
      return initialState;

    case 'UPDATE_COMPLETED':
      return {
        ...state,
        completed: true
      };

    default:
      return state;
  }

};

export default hangman;
