// src/components/Popup.js
import React from 'react';

const Popup = ({ task, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{task.text} has reached the 5-minute time limit!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
