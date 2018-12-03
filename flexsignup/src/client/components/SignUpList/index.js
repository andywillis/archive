import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import styles from './style';

import { updateStatus } from '../../redux/actions/signUps';

class SignUpList extends Component {


  /**
   * Handles redux status update
   * @param {*} id
   * @param {*} status
   * @memberof SignUpList
   */
  handleStatus(id, status) {
    const { updateStatus } = this.props;
    updateStatus(id, status);
  }

  
  /**
   * If the status is not approved/declined
   * return the buttons instead
   * @param {*} status
   * @param {*} id
   * @returns
   * @memberof SignUpList
   */
  getStatusCell(status, id) {
    const { classes } = this.props;
    if (!status) {
      return (
        <div className={classes.status}>
          
          <Button
            className={classes.approve}
            onClick={() => this.handleStatus(id, 'approved')}
          >Approve
          </Button>
          
          <Button
            className={classes.decline}
            onClick={() => this.handleStatus(id, 'declined')}
          >Decline
          </Button>

        </div>
      );
    }
  }


  /**
   * Return a working link for the CV if the entry
   * status is approved
   * @param {*} status
   * @param {*} url
   * @param {*} originalFilename
   * @returns
   * @memberof SignUpList
   */
  getDownloadUrl(status, url, originalFilename) {
    switch (status) {
      case 'approved': return <a href={url}>Download CV</a>;
      case 'declined': return originalFilename;
    }
  }

  /**
   * Return a set of rows of entry data
   * @param {*} list
   * @returns
   * @memberof SignUpList
   */
  getRows(list) {
    const { classes } = this.props;

    if (!list.length) {
      return <tr><td className={classes.cell}>No sign-ups</td></tr>;
    }

    return list.map((entry) => {

      const { id, email, originalFilename, status, url } = entry;

      return (
        <tr key={id} className={classes[status]}>
          <td className={classes.cell}>{email}</td>
          <td className={classes.cell}>
            {(status === 'approved' || !status) && <a href={url}>Download CV</a>}
          </td>
          <td className={classes.cell}>
            {this.getStatusCell(status, id)}
          </td>
        </tr>
      );

    });
  }
  
  render() {

    const { classes, list } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>

          <Typography component="h2" variant="h5">Sign-up list</Typography>

          <table className={classes.table}>
            <tbody>
              {this.getRows(list)}
            </tbody>
          </table>

        </Paper>
      </main>
    )  
  }
};

const mapStateToProps = ({ signUps }) => {
  return {
    list: signUps.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStatus: (id, status) => dispatch(updateStatus(id, status))
  };
};

const connectedList = connect(mapStateToProps, mapDispatchToProps)(SignUpList);

export default withStyles(styles)(connectedList);
