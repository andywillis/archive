// export function setFetchError(bool) {
//   return {
//     type: 'SET_FETCH_ERROR',
//     hasErrored: bool
//   };
// }

// export function setFetchLoader(bool) {
//   return {
//     type: 'SET_FETCH_LOADER',
//     isLoading: bool
//   };
// }

export function sortData(column) {
  return {
    type: 'SET_COLUMN_SORTING',
    column
  };
}

export function setFetchProjectsSuccess(projects) {
  return {
    type: 'SET_FETCH_PROJECTS_SUCCESS',
    projects
  };
}

export function setFetchProjectSuccess(project) {
  return {
    type: 'SET_FETCH_PROJECT_SUCCESS',
    project
  };
}

export function setAddProjectSuccess(project) {
  return {
    type: 'SET_ADD_PROJECT_SUCCESS',
    project
  };
}

// function getParams({ accessToken }) {
//   return {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: accessToken
//     }
//   };
// }

// function getAddParams({ accessToken }, addData) {
//   return {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: accessToken
//     },
//     body: JSON.stringify(addData)
//   };
// }

// const endpoints = {
//   list: 'https://api-test.oxheyhall.com/v1/accounts/projects',
//   view: 'https://api-test.oxheyhall.com/v1/admin/projects',
//   add: 'https://api-test.oxheyhall.com/v1/admin/projects/new'
// };

// export function fetchProjects(params) {
//   return async (dispatch) => {
//     dispatch(setFetchLoader(true));
//     try {
//       const response = await fetch(endpoints.list, getParams(params));
//       dispatch(setFetchLoader(false));
//       const data = await response.json();
//       dispatch(setFetchProjectsSuccess(data));
//     } catch (e) {
//       dispatch(setFetchError(true));
//       dispatch(setFetchLoader(false));
//     }
//   };
// }

// export function fetchProject(id, params) {
//   return async (dispatch) => {
//     dispatch(setFetchLoader(true));
//     try {
//       const response = await fetch(`${endpoints.view}/${id}`, getParams(params));
//       dispatch(setFetchLoader(false));
//       const data = await response.json();
//       dispatch(setFetchProjectSuccess(data));
//     } catch (e) {
//       dispatch(setFetchError(true));
//       dispatch(setFetchLoader(false));
//     }
//   };
// }

// export function addProject(params, addData) {
//   return async (dispatch) => {
//     dispatch(setFetchLoader(true));
//     try {
//       const response = await fetch(endpoints.add, getAddParams(params, addData));
//       dispatch(setFetchLoader(false));
//       const data = await response.json();
//       const { createProjectDocument: project, error } = data;
//       if (project) dispatch(setAddProjectSuccess(project));
//       if (error) throw new Error(error.message);
//     } catch (e) {
//       dispatch(setFetchError(true));
//       dispatch(setFetchLoader(false));
//     }
//   };
// }
