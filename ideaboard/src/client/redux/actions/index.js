export const saveIdea = ({ id, title, text, timestamp }) => {
  return {
    type: 'SAVE_IDEA',
    id,
    timestamp,
    title,
    text
  };
};

export const deleteIdea = (id) => {
  return {
    type: 'DELETE_IDEA',
    id
  };
};

export const updateIdea = ({ id, title, text, timestamp }) => {
  return {
    type: 'UPDATE_IDEA',
    id,
    timestamp,
    title,
    text
  };
};

export const changeOrder = (order) => {
  return {
    type: 'CHANGE_ORDER',
    order
  };
};
