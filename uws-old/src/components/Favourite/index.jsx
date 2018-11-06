// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux
import {
  addFavourite,
  removeFavourite
} from '../../redux/actions/user';

// Style
import './style.css';

/**
 * @function Favourite
 * @return {jsx} Component
 */
class Favourite extends Component {

  constructor(props) {
    super(props);
    this.state = { status: props.status };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ status: newProps.status });
  }

  handleClick() {

    const status = this.state.status === 'active'
      ? 'inactive'
      : 'active';

    if (status === 'active') {
      this.props.addFavourite(this.props.id);
    } else {
      this.props.removeFavourite(this.props.id);
    }

  }

  render() {
    return (
      <div className="Favourite">
        <span
          tabIndex="0"
          role="button"
          className={this.state.status}
          onClick={this.handleClick}
        >&#x2605;</span>
      </div>
    );
  }
}

const mapStateToProps = (state, newProps) => {

  const { favourites } = state.user;

  const status = favourites.includes(newProps.id)
    ? 'active'
    : 'inactive';

  return { status };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavourite: id => dispatch(addFavourite(id)),
    removeFavourite: id => dispatch(removeFavourite(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourite);

Favourite.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  addFavourite: PropTypes.func.isRequired,
  removeFavourite: PropTypes.func.isRequired
};
