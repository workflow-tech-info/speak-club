require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket');
const { chimeWebhookHandler } = require('./chimeWebhook');
const { store } = require('./store');

// --- API Server ---
const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'speak-club-voice-server'
  });
});

app.post('/chime-webhook', chimeWebhookHandler);

app.get('/calls', (req, res) => {
  res.json(store.sessions);
});

app.get('/logs', (req, res) => {
  res.json(store.logs);
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[API] Voice Server initialized on port ${PORT}...`);
  console.log(`[API] HTTP endpoints: http://localhost:${PORT}`);
});

// --- WebSocket Server ---
const wsServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Speak Club Voice Streaming Server (WebSockets Only)\n');
});

setupWebSocket(wsServer);

const WS_PORT = process.env.PORT_WS || 8081;
wsServer.listen(WS_PORT, '0.0.0.0', () => {
  console.log(`[WS] Voice Streaming Server initialized on port ${WS_PORT}...`);
  console.log(`[WS] WebSocket endpoint: ws://localhost:${WS_PORT}/call-stream`);
});
