import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import compileClasses from 'classnames';

import { authUser, resetAuthError } from '../../redux/actions/user';

import style from './style.css';

class LogIn extends PureComponent {

  constructor() {
    super();
    this.state = { username: '', password: '', error: false };
    this.setRef = this.setRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.focusCursor();
  }

  componentDidUpdate() {

    const { accessToken, resetAuthError, error: { statusCode }, history } = this.props;

    if (accessToken) history.push('/project/list');

    if (statusCode) {
      /* eslint react/no-did-update-set-state: 0 */
      this.setState({
        username: '',
        password: '',
        error: true
      }, () => {
        resetAuthError();
        this.focusCursor();
      });
    }

  }

  setRef(node) {
    this.firstInput = node;
  }

  focusCursor() {
    this.firstInput.focus();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { username, password } = this.state;
    const { authUser } = this.props;
    if (!!username && !!password) {
      authUser({ username, password });
    }
  }

  render() {

    const { username, password, error } = this.state;
    const buttonClass = compileClasses(style.button, !!username && !!password && style.active);
    const errorClass = compileClasses(style.errorMessage, error && style.active);

    return (
      <React.Fragment>

        <form className={style.form}>

          <fieldset>
            <label htmlFor="username">Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.handleChange}
                ref={this.setRef}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="password">Password
              <input
                type="password"
                pattern="[a-zA-Z0-9]+"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>

          <button
            className={buttonClass}
            type="button"
            onClick={this.handleSubmit}
          >Authorise
          </button>

        </form>

        <div className={errorClass}>Incorrect username or password</div>

      </React.Fragment>
    );
  }

}

function mapStateToProps(state) {
  const { user: { accessToken, error } } = state;
  return { accessToken, error };
}

function mapDispatchToProps(dispatch) {
  return {
    authUser: params => dispatch(authUser(params)),
    resetAuthError: () => dispatch(resetAuthError())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
