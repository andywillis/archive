import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner';

import { fetchProject } from '../../redux/actions/app';

import style from './style.css';

class View extends Component {

  constructor() {
    super();
    this.handleList = this.handleList.bind(this);
  }

  componentDidMount() {
    const { accessToken, id, fetchProject, project } = this.props;
    if (id !== project.id) {
      const params = { accessToken };
      fetchProject(id, params);
    }
  }

  handleList() {
    const { history } = this.props;
    history.push('/project/list');
  }

  render() {

    const { project, id } = this.props;

    if (!project || (project && id !== project.projectId)) return <Spinner />;

    const { projectId, projectName, dateCreated, dateUpdated } = project;

    return (
      <div className={style.project}>

        <button
          type="button"
          className={style.back}
          onClick={this.handleList}
        >Back to project list
        </button>

        <section>
          <div className={style.name}>{projectName}</div>
          <div className={style.id}>#{projectId}</div>
          <div className={style.created}>Created: {dateCreated}</div>
          <div className={style.updated}>Updated: {dateUpdated}</div>
        </section>

      </div>
    );

  }
}

function mapStatetoProps(state, otherProps) {
  const { user: { accessToken }, app: { project } } = state;
  const { match: { params: { id } } } = otherProps;
  return { accessToken, project, id, otherProps };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProject: (id, params) => dispatch(fetchProject(id, params))
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(View);
