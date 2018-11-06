// Dependencies
import { connect } from 'react-redux';

// React
import NoteList from '../../components/NoteList';

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id || null;
  const notes = state.notes;
  const filteredNotes = id ? notes.filter(note => note.id === id) : notes;

  // reverse the array so that the last added
  // note is first
  return { notes: filteredNotes };
}

export default connect(mapStateToProps)(NoteList);
