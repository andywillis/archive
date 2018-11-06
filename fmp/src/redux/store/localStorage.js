export const loadNotes = () => {
  try {
    const serialisedData = localStorage.getItem('notes');
    if (serialisedData === null) {
      return undefined;
    }
    return JSON.parse(serialisedData);
  } catch (e) {
    return undefined;
  }
};

export const saveNotes = (state) => {
  try {
    const serialisedData = JSON.stringify(state);
    localStorage.setItem('notes', serialisedData);
  } catch (e) {
    // Ignore
  }
};
