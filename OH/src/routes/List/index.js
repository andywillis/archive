import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner';

import { fetchProjects, sortData } from '../../redux/actions/app';

import style from './style.css';

class List extends Component {

  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    const { accessToken, fetchProjects, projects } = this.props;
    if (!projects.length) {
      const params = { accessToken };
      fetchProjects(params);
    }
  }

  handleSort(e) {
    const { dataset: { column } } = e.target;
    const { sortData } = this.props;
    sortData(column);
  }

  handleAdd() {
    const { history } = this.props;
    history.push('/project/add');
  }

  handleClick(e) {
    const { parentNode } = e.target;
    const { history } = this.props;
    const { dataset: { id } } = parentNode;
    history.push(`/project/view/${id}`);
  }

  render() {

    const { projects, column } = this.props;

    if (!projects || !projects.length) return <Spinner />;

    return (
      <div className={style.projects}>

        <button
          type="button"
          className={style.add}
          onClick={this.handleAdd}
        >Add new project
        </button>

        <table>

          <thead>
            <tr onClick={this.handleSort}>
              <th className={column === 'projectId' ? style.headerActive : undefined} data-column="projectId">#ID</th>
              <th className={column === 'projectName' ? style.headerActive : undefined} data-column="projectName">Name</th>
              <th className={column === 'active' ? style.headerActive : undefined} data-column="active">Active</th>
              <th className={column === 'budget' ? style.headerActive : undefined} data-column="budget">Budget</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => {
              const { projectId, projectName, active, budget } = project;
              const formattedBudget = budget ? `£${Number(budget).toLocaleString('en-UK')}` : 'n/a';
              const formattedActive = active || 'n/a';
              return (
                <tr key={projectId} data-id={projectId} onClick={this.handleClick}>
                  <td>{projectId}</td>
                  <td>{projectName}</td>
                  <td>{formattedActive}</td>
                  <td>{formattedBudget}</td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    );

  }
}

function mapStatetoProps(state, otherProps) {
  const { user: { accessToken }, app: { projects, column } } = state;
  return { accessToken, projects, column, otherProps };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProjects: params => dispatch(fetchProjects(params)),
    sortData: column => dispatch(sortData(column))
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(List);
