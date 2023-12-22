// src/Components/historyUtils.js
const historyUtils = {
    data: [],
  
    addTask: (task) => {
      historyUtils.data.push(task);
    },
  
    getHistoryData: () => {
      return historyUtils.data;
    },
  };
  
  export default historyUtils;
  