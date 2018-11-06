// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import { connect } from 'react-redux';

// Redux
import { saveNote } from '../../redux/actions';

// React
import ColorStrip from '../ColorStrip';

// Style
import './style.css';

/**
 * @function NoteForm
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
class NoteForm extends Component {

  static encodeInput(txt) {
    return txt
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  constructor(props) {
    super(props);
    this.state = { title: '', text: '', color: 'blue' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleSwatchChange = this.handleSwatchChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = NoteForm.encodeInput(this.state.title);
    const text = NoteForm.encodeInput(this.state.text);
    const color = this.state.color;
    if (title.length || text.length) {
      this.props.saveNote({ title, text, color });
      this.setState({ title: '', text: '', color: '' });
    }
  }

  handleSwatchChange(color) {
    this.setState({ color });
  }

  handleMarkdownChange(e) {
    this.setState({ markdown: e.target.checked });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleNoteChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="NoteForm">
        <form onSubmit={this.handleSubmit}>
          <input
            type="title"
            onChange={this.handleTitleChange}
            placeholder="Add heading (optional)"
            value={this.state.title}
          />
          <TextareaAutosize
            rows={2}
            onChange={this.handleNoteChange}
            placeholder="Add note description (optional)"
            value={this.state.text}
          />
          <div className="BottomBar">
            <ColorStrip
              defaultColor="blue"
              handleSwatchChange={this.handleSwatchChange}
            />
            <div className="Submit">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNote: note => dispatch(saveNote(note))
  };
};

export default connect(null, mapDispatchToProps)(NoteForm);

NoteForm.propTypes = {
  saveNote: PropTypes.func.isRequired
};
