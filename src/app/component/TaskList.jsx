import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';

const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3>{name}</h3>
    {tasks.map((task) => (
      <div key={task.id}>{task.name}</div>
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
