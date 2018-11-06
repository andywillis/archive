import uuid from 'uuid/v4';

export const saveNote = ({ title, text, color }) => {
  return {
    type: 'SAVE_NOTE',
    id: uuid(),
    title,
    text,
    color
  };
};

export const deleteFavourite = (id) => {
  return {
    type: 'DELETE_NOTE',
    id
  };
};
