export const loadUser = () => {
  try {
    const serialisedUser = localStorage.getItem('user');
    if (serialisedUser === null) {
      return undefined;
    }
    return JSON.parse(serialisedUser);
  } catch (e) {
    return undefined;
  }
};

export const saveUser = (state) => {
  try {
    const serialisedUser = JSON.stringify(state);
    localStorage.setItem('user', serialisedUser);
  } catch (e) {
    // Ignore
  }
};
