// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import markdown from 'markdown-it';

// Style
import './style.css';

const md = markdown();

/**
 * @function Para
 * @param  {object} props Component properties
 * @return {jsx} Component
 */
class NoteListItem extends Component {

  static getTitle(title) {
    if (title.length) return <div className="Title">{title}</div>;
  }

  static truncate(text) {
    return text.length > 200 ? `${text.substr(0, 200)} [more]` : text;
  }

  static getText(text, truncate) {
    if (text.length) {
      return (
        <div className="Text">
          {renderHTML(truncate ? NoteListItem.truncate(text) : text)}
        </div>
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = { isShowingModal: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({ isShowingModal: true });
  }

  handleClose() {
    this.setState({ isShowingModal: false });
  }

  render() {
    const { id, title, text, color } = this.props;
    const className = `Note ${color}`;
    if (!this.state.isShowingModal) {
      return (
        <div data-id={id} role="presentation" className={className} onClick={this.handleClick}>
          {NoteListItem.getTitle(title)}
          {NoteListItem.getText(md.render(text), true)}
        </div>
      );
    }
    return (
      <ModalContainer onClose={this.handleClose}>
        <ModalDialog className="Modal" onClose={this.handleClose}>
          {NoteListItem.getTitle(title)}
          {NoteListItem.getText(md.render(text), false)}
        </ModalDialog>
      </ModalContainer>
    );
  }
}

export default NoteListItem;

// Function proptypes
NoteListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
