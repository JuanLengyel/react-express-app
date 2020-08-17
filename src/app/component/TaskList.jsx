import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3>{name}</h3>
    {tasks.map((task) => (
      <Link to={`task/${task.id}`} key={task.id}>
        <div>{task.name}</div>
      </Link>
    ))}
    <button onClick={() => createNewTask(id)}>Add New</button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    id: ownProps.id,
    tasks: state.tasks.filter((task) => task.group === ownProps.id),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      console.log(`Create new task ${id}`);
      dispatch(requestTaskCreation(id));
    },
  };
};

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
