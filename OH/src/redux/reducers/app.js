const initialState = {
  projects: [],
  project: {},
  column: 'projectId',
  isLoaded: false,
  hasErrored: false
};

function sorter(column) {
  if (column === 'budget') {
    return (a, b) => a[column] - b[column];
  }
  return (a, b) => a[column] > b[column];
}

function projects(state = initialState, action) {

  const { isLoading, hasErrored, projects, project, column } = action;

  switch (action.type) {

    case 'SET_FETCH_LOADER': {
      return { ...state, isLoading };
    }

    case 'SET_FETCH_ERROR': {
      return { ...state, hasErrored };
    }

    case 'SET_FETCH_PROJECTS_SUCCESS': {
      return { ...state, projects };
    }

    case 'SET_FETCH_PROJECT_SUCCESS': {
      return { ...state, project };
    }

    case 'SET_ADD_PROJECT_SUCCESS': {
      const updatedProjects = [...state.projects, project];
      updatedProjects.sort(sorter(column));
      return { ...state, projects: updatedProjects, project };
    }

    case 'SET_COLUMN_SORTING': {
      const sortedData = [...state.projects].sort(sorter(column));
      return { ...state, projects: sortedData, column };
    }

    default: {
      return state;
    }

  }

}

export default projects;
