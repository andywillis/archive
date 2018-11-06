// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// React
import NoteForm from '../NoteForm';
import NoteListItem from '../NoteListItem';
import Para from '../Para';

// Style
import './style.css';

function buildNoteList(notes) {
  if (notes.length) {
    return notes.map((note) => {
      return (
        <NoteListItem
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text}
          markdown={note.markdown}
          color={note.color}
        />
      );
    });
  }
  return <Para html="No notes available." />;
}

const NoteList = ({ notes }) => {
  return (
    <div>
      <NoteForm />
      <div role="presentation" className="NoteList">
        <div className="Notes">
          {buildNoteList(notes)}
        </div>
      </div>
    </div>
  );
}

export default NoteList;

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
};
