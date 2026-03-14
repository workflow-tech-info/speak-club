require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { chimeWebhookHandler } = require('./chimeWebhook');

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'speak-club-voice-api',
    timestamp: new Date().toISOString()
  });
});

// Chime Webhook Endpoint
app.post('/chime-webhook', chimeWebhookHandler);

const PORT = process.env.PORT_API || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[API] Voice Webhook Server initialized on port ${PORT}...`);
  console.log(`[API] Domain: api.voice.workflow-tech.info`);
});
