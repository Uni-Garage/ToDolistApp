// src/components/Task.js
import React, { useState, useEffect } from 'react';
import "./task.css";

const Task = ({ task, onDelete }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(task.completed);

  useEffect(() => {
    if (!isCompleted) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCompleted]);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div class="ali" style={{ color: isCompleted ? 'red' : 'black' }}>
      <input
        type="checkbox"
        onChange={handleCheckboxChange}
        checked={isCompleted}
        id={`task-${task.id}`}
        disabled={isCompleted}
      />
      <label class="tskt" htmlFor={`task-${task.id}`} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
        {task.text} - {formatTime(elapsedTime)}
      </label>
      <button class="del" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default Task;
