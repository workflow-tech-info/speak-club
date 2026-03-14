require('dotenv').config();
const http = require('http');
const { setupWebSocket } = require('./websocket');

// Minimal server specifically for hosting the WebSocket
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Speak Club Voice Streaming Server (WebSockets Only)\n');
});

// Setup WebSocket Server (logic inside websocket.js already handles path /call-stream)
setupWebSocket(server);

const PORT = process.env.PORT_WS || 8081;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[WS] Voice Streaming Server initialized on port ${PORT}...`);
  console.log(`[WS] Domain: ws.voice.workflow-tech.info`);
});
