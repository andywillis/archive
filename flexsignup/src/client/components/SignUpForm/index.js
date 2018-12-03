import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import S3Uploader from '../S3Uploader';

import { addSignUp } from '../../redux/actions/signUps';

import styles from './styles';

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      filename: null,
      url: null,
      valid: { email: true, password: true, filename: false }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.isInputValid = this.isInputValid.bind(this);
  }

  
  /**
   * Returns the S3 component for use in the form
   * @param {*} values
   * @returns
   * @memberof SignUpForm
   */
  getFileComponent(values) {
    const { originalFilename, valid: { filename } } = this.state;
    if (!filename) {
      return (
        <S3Uploader
          valid={filename}
          handleResponse={this.handleResponse}
          required={values.required}
        />
      );
    }
    return <div>{originalFilename} uploaded</div>;
  }


  /**
   * The function that is called for the onFinish of the s3 uploaded
   * - updates the status with the file information
   * @param {*} { filename, publicUrl: url, originalFilename }
   * @memberof SignUpForm
   */
  handleResponse({ filename, publicUrl: url, originalFilename }) {
    this.setState((prevState) => {
      return {
        ...prevState,
        filename,
        url,
        originalFilename,
        valid: { ...prevState.valid, filename: true }
      };
    }, () => console.log(this.state));
  }


  /**
   * Update the state with each key press
   * @param {*} e
   * @memberof SignUpForm
   */
  handleKeyUp(e) {
    const { name, value } = e.target;
    const inputValid = this.isInputValid(name);
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        valid: { ...prevState.valid, [name]: inputValid }
      };
    });  
  }

  isInputValid(name) {
    const { email, password, filename } = this.state;
    switch (name) {
      case 'email': {
        const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        return regex.test(email);
      }
      case 'password': {
        return password.length >= 5;
      }
      case 'filename': {
        return filename !== null && filename.length > 0;
      }
    }
  }

  isFormValid() {
    const { valid } = this.state;
    return Object.keys(valid).every(key => valid[key]);
  }

  handleSubmit(e) {
    const { history } = this.props;
    e.preventDefault();

    // don't pick out the password - we don't need to save that locally
    const { email, filename, url, originalFilename } = this.state;
    const { addSignUp } = this.props;
    addSignUp({ email, filename, url, originalFilename });
    
    // submit the form - no need to do that right now though
    // e.target.submit();

    // instead we can go route straight to the list component
    history.push('/list');
  }

  render() {

    const { classes } = this.props;
    const { email, password, valid } = this.state;

    return (
      <main className={classes.main}>

        <CssBaseline />

        <Paper className={classes.paper}>

          <Avatar className={classes.avatar}><LockIcon /></Avatar>

          <Typography component="h1" variant="h5">
            Sign up with a CV
          </Typography>

          <form action="https://madeupurl.com" className={classes.form} onSubmit={this.handleSubmit}>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                inputProps={{
                  className: !valid.email && classes.invalid
                }}
                id="email"
                name="email"
                autoFocus
                value={email}
                onChange={this.handleKeyUp}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password (min 6 characters)</InputLabel>
              <Input
                inputProps={{
                  className: !valid.password && classes.invalid
                }}
                name="password"
                type="password"
                id="password"
                value={password}
                onChange={this.handleKeyUp}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              {!valid.filename && <InputLabel htmlFor="upload">Upload CV</InputLabel>}
              <Input
                inputProps={{
                  className: !valid.filename && classes.invalid
                }}
                name="upload"
                id="upload"
                type="file"
                inputComponent={(values) => {
                  return this.getFileComponent(values);
                }}
                onChange={this.handleUpload}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!this.isFormValid() && 'disabled'}
              className={classes.submit}
            >Sign up
            </Button>

          </form>

        </Paper>
      </main>
    );
  }

}

const mapStateToProps = ({ signUps }, { history }) => {
  return {
    list: signUps.list,
    history
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSignUp: signUp => dispatch(addSignUp(signUp))
  };
};

const connectedForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default withStyles(styles)(connectedForm)
