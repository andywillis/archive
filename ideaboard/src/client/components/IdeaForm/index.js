import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import classNames from 'classnames';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { saveIdea, deleteIdea, updateIdea } from '../../redux/actions';

import style from './style.css';

/**
 * Originally the idea form and the idea list items were two
 * separate components but, since they share almost the same
 * functionality, it seemed reasonable to use one component for both.
 *
 * The `newIdea` state property allows the code to switch between
 * the add/update views easily.
 *
 * @class NoteIdea
 * @extends {Component}
 */
export class IdeaForm extends Component {

  static decodeInput(txt) {
    return txt
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&quot;/g, '"');
  }

  static encodeInput(txt) {
    return txt
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  static getTimestamp() {
    return new Date().toUTCString();
  }

  static getFormattedTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString('en-GB', { timeZone: 'UTC' });
  }

  static decodeIdea(idea) {
    const { title: encodedTitle, text: encodedText } = idea;
    const title = IdeaForm.decodeInput(encodedTitle);
    const text = IdeaForm.decodeInput(encodedText);
    return { ...idea, title, text };
  }

  constructor(props) {
    super(props);
    const { idea } = props;
    const empty = { title: '', text: '', newIdea: true };

    // either set state as the passed in note or, if that
    // doesn't exist, a new note object
    this.state = idea && idea.id ? IdeaForm.decodeIdea(idea) : empty;
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.focusForm = this.focusForm.bind(this);
  }

  componentDidMount() {
    this.focusForm();
  }

  getEncodedIdea() {
    const { title: unencodedTitle, text: unencodedText } = this.state;
    const title = IdeaForm.encodeInput(unencodedTitle);
    const text = IdeaForm.encodeInput(unencodedText);
    return { title, text };
  }

  handleAdd() {
    const { title, text } = this.getEncodedIdea();
    const { saveNote } = this.props;
    const timestamp = IdeaForm.getTimestamp();
    const id = uuid();
    saveNote({ id, title, text, timestamp });

    // refocus on the title input box once the idea has been added
    this.setState({ title: '', text: '', newIdea: true }, this.focusForm);
  }

  handleUpdate(id) {
    const { title, text } = this.getEncodedIdea();
    const { updateNote } = this.props;
    const timestamp = IdeaForm.getTimestamp();
    const updated = true;
    updateNote({ id, title, text, timestamp });
    this.setState({ title, text, timestamp, updated }, this.updateUIAfterUpdate);
  }

  updateUIAfterUpdate() {
    setTimeout(() => {
      this.setState({ updated: false });
    }, 3000);
  }

  handleTitleChange(e) {
    const { value } = e.target;
    this.setState({ title: value });
  }

  handleTextChange(e) {
    const { value } = e.target;
    if (value.length <= 140) {
      this.setState({ text: value });
    }
  }

  handleDelete(id) {
    const { deleteNote } = this.props;
    deleteNote(id);
  }

  isValid() {
    const { title, text } = this.state;
    return title.length && text.length;
  }

  focusForm() {
    if (this.titleInput) this.titleInput.focus();
  }

  render() {

    const { id, timestamp, title, text, newIdea, updated } = this.state;

    return (
      <div className={classNames(style.form, newIdea && style.newIdea)}>
        <form>

          {newIdea && (
            <input
              className={style.title}
              type="text"
              onChange={this.handleTitleChange}
              ref={(input) => { this.titleInput = input; }}
              placeholder="Add title"
              value={title}
            />
          )}

          {!newIdea && (
            <input
              className={style.title}
              type="text"
              onChange={this.handleTitleChange}
              placeholder="Add title"
              value={title}
            />
          )}

          <TextareaAutosize
            className={style.textarea}
            name="text"
            rows={2}
            onChange={this.handleTextChange}
            placeholder="Add description"
            value={text}
          />

          {!newIdea && (
            <div
              className={classNames(style.timestamp, updated && style.updated)}
            >{IdeaForm.getFormattedTimestamp(timestamp)}
            </div>
          )}

          <div className={style.bottomBar}>

            <div className={style.count}>{140 - text.length}</div>

            {newIdea && (
              <button
                className={style.add}
                type="button"
                disabled={!this.isValid() && 'disabled'}
                onClick={this.handleAdd}
              >Add idea
              </button>
            )}

            {!newIdea && (
              <>
                <button
                  className={style.update}
                  type="button"
                  disabled={!this.isValid() && 'disabled'}
                  onClick={() => this.handleUpdate(id)}
                >Update
                </button>
                <button
                  className={style.delete}
                  type="button"
                  onClick={() => this.handleDelete(id)}
                >Delete
                </button>
              </>
            )}

          </div>

        </form>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    saveNote: idea => dispatch(saveIdea(idea)),
    deleteNote: id => dispatch(deleteIdea(id)),
    updateNote: (id, title, text) => dispatch(updateIdea(id, title, text))
  };
};

export default connect(null, mapDispatchToProps)(IdeaForm);
