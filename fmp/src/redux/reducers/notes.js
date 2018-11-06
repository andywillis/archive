const initialState = [
  { id: '8190be8e-9b46-4a4f-b63b-0852fa2aac0b', color: 'blue', title: 'Flickr responsive images', text: 'Today I implemented basic responsive images for this site in order to improve the performance, and it took less than an hour thanks - mainly - to Flickr.\n\nWhen you upload a new image to Flickr the service will automatically create and host new sizes of that image. Those copies can be requested through a simple http request (no need to use the API if you don\'t need to) according to a simple formula.\n\nFor reference here\'s a list of the sizes along with their sizeIds based on an original image size of 2592x1456. Those marked with an asterisk are those sizes used for the devices that might visit this site.' },
  { id: '6a6d37f4-740e-44bf-8537-f416ebc97ade', color: 'blue', title: 'Note 2', text: 'This is the second note.' },
  { id: 'd187827c-f4cb-4457-9860-8aa9a86234bb', color: 'blue', title: 'Note 3', text: 'This is note #3.' },
  { id: '7ee0cae7-0084-4213-a725-6777513473ce', color: 'blue', title: 'Note 3', text: '# Markdown' }
];

const notes = (state = initialState, action) => {

  switch (action.type) {

    case 'SAVE_NOTE':

      // Add the new note to the first position
      return [
        {
          id: action.id,
          format: action.format,
          title: action.title,
          text: action.text,
          color: action.color
        },
        ...state
      ];

    case 'DELETE_NOTE':
      return state.notes.filter(note => note.id !== action.id);

    default:
      return state;
  }

};

export default notes;
