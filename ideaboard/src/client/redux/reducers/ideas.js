export const initialState = {
  order: 'timestamp',
  ideas: [
    {
      id: '9d468631-a0f0-41dd-bc60-b9b773b83ec1',
      title: 'Improve update notification',
      text: 'Perhaps add &quot;saved&quot; to the timestamp box, then apply the updated timestamp.',
      timestamp: 'Fri, 23 Nov 2018 16:19:27 GMT'
    },
    {
      id: 'e4848a55-c38d-444b-8c23-b9073987d6c0',
      title: 'Add idea ordering',
      text: 'By timestamp, and alphabetically by title.',
      timestamp: 'Fri, 23 Nov 2018 17:09:12 GMT'
    }
  ]
};

export const ideas = (state = initialState, action) => {

  switch (action.type) {

    case 'SAVE_IDEA': {
      const { id, title, text, timestamp } = action;
      return {
        ...state,
        ideas: [ ...state.ideas, { id, title, text, timestamp } ]
      };
    }

    case 'DELETE_IDEA': {
      const { id } = action;
      return {
        ...state,
        ideas: [ ...state.ideas.filter(idea => idea.id !== id) ]
      }
    }

    case 'UPDATE_IDEA': {
      const { id, title, text, timestamp } = action;
      const idea = state.ideas.find(idea => idea.id === id);
      const filteredNotes = state.ideas.filter(idea => idea.id !== id);
      const updatedNote = { ...idea, title, text, timestamp };
      return {
        ...state,
        ideas: [ ...filteredNotes, updatedNote ]
      };
    }

    case 'CHANGE_ORDER': {
      const { order } = action;
      return { ...state, order };
    }

    default: {
      return state;
    }

  }

};

export default ideas;
