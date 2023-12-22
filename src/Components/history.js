// src/Components/history.js
import React from 'react';
import "./history.css"

const History = ({ historyData }) => {
  return (
    <div>
      <h2>Full Task History</h2>
      <pre class="hist">{JSON.stringify(historyData, null, 2)}</pre>
    </div>
  );
};

export default History;
