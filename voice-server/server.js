require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { setupWebSocket } = require('./websocket');
const { chimeWebhookHandler } = require('./chimeWebhook');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'speak-club-voice-server'
  });
});

// Chime Webhook Endpoint
app.post('/chime-webhook', chimeWebhookHandler);

// Setup WebSocket Server
setupWebSocket(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`[SYS] Voice Server initialized on port ${PORT}...`);
  console.log(`[SYS] HTTP endpoints: http://localhost:${PORT}`);
  console.log(`[SYS] WebSocket endpoint: ws://localhost:${PORT}/call-stream`);
});
