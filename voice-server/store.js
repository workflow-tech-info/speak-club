// voice-server/store.js
const store = {
  sessions: {},
  logs: []
};

// Add to logs keeping max 1000 items
function addLog(event) {
  store.logs.push({ ...event, timestamp: new Date().toISOString() });
  if (store.logs.length > 1000) {
    store.logs.shift();
  }
}

module.exports = {
  store,
  addLog,
};
