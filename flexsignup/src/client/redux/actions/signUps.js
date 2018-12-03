const uuidv4 = require('uuid/v4');

export const addSignUp = (data) => {
  const id = uuidv4();
  const signUp = { ...data, id };
  return {
    type: 'ADD_SIGN_UP',
    signUp
  };
};

export const updateStatus = (id, status) => {
  return {
    type: 'UPDATE_STATUS',
    id,
    status
  };
};
