// src/components/TodoList.js
import React from 'react';
import Task from './task';

const TodoList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <div key={task.id} style={{ marginBottom: '10px' }}>
          <Task task={task} onToggle={onToggle} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
