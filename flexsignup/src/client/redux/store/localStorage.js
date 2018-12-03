export const loadSignUps = () => {
  try {
    const serialisedSignUps = localStorage.getItem('signUps');
    if (serialisedSignUps === null) return undefined;
    return JSON.parse(serialisedSignUps);
  } catch (e) {
    return undefined;
  }
};

export const saveSignUps = (state) => {
  try {
    if (!localStorage) throw new Error('localstorage not available');
    const serialisedSignUps = JSON.stringify(state);
    localStorage.setItem('signUps', serialisedSignUps);
  } catch (e) {
    console.error(e);
  }
};
