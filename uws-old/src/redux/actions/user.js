export const addFavourite = (id) => {
  return {
    type: 'ADD_FAVOURITE',
    id
  };
};

export const removeFavourite = (id) => {
  return {
    type: 'REMOVE_FAVOURITE',
    id
  };
};

export const inflateUser = (user) => {
  return {
    type: 'INFLATE_USER',
    user
  };
};
