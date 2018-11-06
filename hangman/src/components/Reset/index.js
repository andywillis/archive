import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetBoard } from '../../redux/actions';

import './style.css';

function Reset({ resetBoard }) {
  return (
    <button className="reset" onClick={resetBoard}>Reset</button>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetBoard: () => dispatch(resetBoard())
  };
};

export default connect(null, mapDispatchToProps)(Reset);

Reset.propTypes = {
  resetBoard: PropTypes.func.isRequired
};
