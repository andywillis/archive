export function loadUser() {
  try {
    if (window.sessionStorage) {
      const serialisedUser = sessionStorage.getItem('user');
      if (serialisedUser === null) {
        return undefined;
      }
      return JSON.parse(serialisedUser);
    }
    throw new Error('localStorage not found');
  } catch (e) {
    console.log(e);
  }
}

export function saveUser(state) {
  try {
    if (window.sessionStorage) {
      const serialisedUser = JSON.stringify(state);
      sessionStorage.setItem('user', serialisedUser);
    } else {
      throw new Error('localStorate not found');
    }
  } catch (e) {
    console.log(e);
  }
}
