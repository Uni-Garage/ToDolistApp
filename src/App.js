// src/App.js
import React, { useState, useEffect } from 'react';
import TodoList from './Components/tasklist';
import Popup from './Components/popup';
import History from './Components/history'; // Import the History component
import historyUtils from './Components/historyUtils'; // Import the history utility

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const [dailyHistory, setDailyHistory] = useState([]);
  const [showFullHistory, setShowFullHistory] = useState(false);



  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('dailyHistory')) || [];
    setDailyHistory(storedHistory);
  }, []);
  

  const addTask = () => {
    const currentDate = getCurrentDate();
    if (!currentDay || currentDay !== currentDate) {
      setCurrentDay(currentDate);
      setTasks([]);
    }
    if (newTask.trim() !== '') {
      const newTaskObject = { id: Date.now(), text: newTask, enteredText: newTask, completed: false, elapsedTime: 0,      createdAt: new Date().toLocaleString(),
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      checkTaskTimeLimit(newTaskObject);
      // Update daily history
    updateDailyHistory(currentDate, newTaskObject);
  
    }
  };
  
  const updateDailyHistory = (date, newTask) => {
    const existingDayIndex = historyUtils.data.findIndex((item) => item.day === date);
    if (existingDayIndex !== -1) {
      // If the day already exists in the history, update its texts
      const currentDay = historyUtils.data[existingDayIndex];
      const sequenceNumber = currentDay.texts.length + 1;
  
      historyUtils.data[existingDayIndex].texts.push({
        sequence: sequenceNumber,
        text: newTask.text,
        enteredText: newTask.enteredText, // Include entered text in history
        createdAt: newTask.createdAt,
      });
    } else {
      // If the day doesn't exist, create a new entry
      historyUtils.data.push({
        day: date,
        sequence: 1,
        texts: [
          {
            sequence: 1,
            text: newTask.text,
            enteredText: newTask.enteredText, // Include entered text in history
            createdAt: newTask.createdAt,
          },
        ],
      });
    }
  };
  

  const toggleShowFullHistory = () => {
    setShowFullHistory(!showFullHistory);
  };


  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const checkTaskTimeLimit = (task) => {
    if (task.elapsedTime >= 300) {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({ ...task, elapsedTime: task.elapsedTime + 1 }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [tasks]);

  useEffect(() => {
    // Update daily history in local storage whenever tasks change
    localStorage.setItem('dailyHistory', JSON.stringify(dailyHistory));
  }, [dailyHistory]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleSaveToFile = () => {
    const historyData = historyUtils.getHistoryData();
    const blob = new Blob([JSON.stringify(historyData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'task_history.json';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  
  return (
    <div>
    <div className="container">
      <h1>Todo List</h1>
      <div className="input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="record-container">
      {tasks.length > 0 && (
        <div class="tr">
          <h3 class="ht">Tasks</h3>
          <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      )}
      
      {showPopup && <Popup onClose={closePopup} />}
      </div>
    </div>
    <div class="footer">
      <h3>Don't RELOAD once opened</h3>
      </div>
    <div>
    <div className="record-container">
        <h2>
        <button onClick={toggleShowFullHistory}>
          {showFullHistory ? 'Hide' : 'SHOW Full History'}
        </button></h2>
        {showFullHistory && <History historyData={historyUtils.getHistoryData()} />}
        {tasks.length === 0 && (
          <button class="btn" onClick={handleSaveToFile}>Save History to File</button>
        )}
      </div>
    </div>
    </div>
  );
};

export default App;
