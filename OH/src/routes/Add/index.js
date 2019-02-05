import React, { Component } from 'react';
import { connect } from 'react-redux';
import compileClasses from 'classnames';

import { addProject } from '../../redux/actions/app';

import style from './style.css';

class View extends Component {

  constructor() {
    super();
    this.state = { projectName: '', budget: '' };
    this.setRef = this.setRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  componentDidMount() {
    this.focusCursor();
  }

  setRef(node) {
    this.firstInput = node;
  }

  handleList() {
    const { history } = this.props;
    history.push('/project/list');
  }

  focusCursor() {
    this.firstInput.focus();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { projectName, budget } = this.state;
    const { addProject, accessToken, history } = this.props;
    if (!!projectName && !!budget) {
      const projectId = projectName.replace(' ', '-').toLowerCase();
      const updatedBudget = Number(budget);
      const dateCreated = new Date();
      const addData = { projectId, projectName, budget: updatedBudget, dateCreated };
      const params = { accessToken };
      addProject(params, addData);
      history.push('/project/list');
    }
  }

  render() {

    const { projectName, budget } = this.state;
    const buttonClass = compileClasses(style.button, !!projectName && !!budget && style.active);

    return (
      <div className={style.add}>

        <button
          type="button"
          className={style.back}
          onClick={this.handleList}
        >Back to project list
        </button>

        <form className={style.form}>

          <fieldset>
            <label htmlFor="projectName">Project Name
              <input
                type="text"
                name="projectName"
                value={projectName}
                onChange={this.handleChange}
                ref={this.setRef}
              />
            </label>
          </fieldset>

          <fieldset>
            <label htmlFor="budget">Budget
              <input
                type="text"
                pattern="[0-9]+"
                name="budget"
                value={budget}
                onChange={this.handleChange}
              />
            </label>
          </fieldset>

          <button
            className={buttonClass}
            type="button"
            onClick={this.handleSubmit}
          >Add project
          </button>

        </form>

      </div>

    );

  }
}

function mapStateToProps(state) {
  const { user: { accessToken } } = state;
  return { accessToken };
}

function mapDispatchToProps(dispatch) {
  return {
    addProject: (params, addData) => dispatch(addProject(params, addData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
