const WebSocket = require('ws');

// Placeholder pipeline function
function processAudioFrame(frame) {
  // Future integrations: ElevenLabs, Vapi, STT engines
  console.log("[AUDIO] audio frame received");
}

function setupWebSocket(server) {
  // Path aligns with wss://voice.workflow-tech.info/call-stream definition
  const wss = new WebSocket.Server({ server, path: '/call-stream' });

  wss.on('connection', (ws, req) => {
    const connectionId = Math.random().toString(36).substring(2, 15);
    const clientIp = req.socket.remoteAddress;
    const timestamp = new Date().toISOString();

    console.log(`[WS] Client Connected | ID: ${connectionId} | IP: ${clientIp} | Time: ${timestamp}`);

    // Optional Token Authentication
    const url = new URL(req.url, `ws://${req.headers.host || 'localhost'}`);
    const token = url.searchParams.get('token');
    
    if (process.env.VOICE_API_KEY && token !== process.env.VOICE_API_KEY) {
      console.log(`[WS] Connection rejected: Invalid or missing token (ID: ${connectionId})`);
      ws.close(1008, 'Unauthorized');
      return;
    }

    // Handle incoming messages
    ws.on('message', (message, isBinary) => {
      if (isBinary) {
        // Handle binary audio frames
        console.log(`[WS MSG] Binary Frame | Size: ${message.length} bytes | ID: ${connectionId}`);
        processAudioFrame(message);
      } else {
        // Handle JSON control messages
        try {
          const data = JSON.parse(message.toString());
          console.log(`[WS MSG] JSON Control | Type: ${data.type || 'unknown'} | ID: ${connectionId}`);
        } catch (e) {
          console.log(`[WS MSG] Text Frame (Non-JSON) | Length: ${message.length} | ID: ${connectionId}`);
        }
      }
    });

    ws.on('close', () => {
      console.log(`[WS] Client Disconnected | ID: ${connectionId}`);
      clearInterval(heartbeatInterval);
    });

    ws.on('error', (error) => {
      console.error(`[WS] Error | ID: ${connectionId} | Message: ${error.message}`);
    });

    // Send heartbeat every 10 seconds
    const heartbeatInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'heartbeat' }));
      }
    }, 10000);
  });
}

module.exports = { setupWebSocket };
