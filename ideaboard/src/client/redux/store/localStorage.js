export const loadIdeas = () => {
  try {
    const serialisedData = localStorage.getItem('ideas');
    if (serialisedData === null) {
      return undefined;
    }
    return JSON.parse(serialisedData);
  } catch (e) {
    console.error(e);
  }
};

export const saveIdeas = (state) => {
  try {
    const serialisedData = JSON.stringify(state);
    localStorage.setItem('ideas', serialisedData);
  } catch (e) {
    console.error(e);
  }
};
