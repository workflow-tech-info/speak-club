const WebSocket = require('ws');
const { store, addLog } = require('./store');

// Dummy silent audio response (Base64) - 1 second of PCM 16-bit 8000 Hz mono silence
const dummyAudioBase64 = Buffer.alloc(16000, 0).toString('base64');

// Placeholder pipeline function
function processAudioFrame(session, base64Audio, ws) {
  // Pass to STT/LLM/TTS in the future
  
  // Test Mode: respond every 20 packets
  if (session && session.packets_received % 20 === 0) {
    const responseEvent = {
      event: 'media',
      stream_id: session.stream_id,
      media: {
        payload: dummyAudioBase64
      }
    };
    ws.send(JSON.stringify(responseEvent));
    addLog({ type: 'server_response', stream_id: session.stream_id, action: 'sent_dummy_audio' });
  }
}

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: '/call-stream' });

  wss.on('connection', (ws, req) => {
    const connectionId = Math.random().toString(36).substring(2, 15);
    let currentStreamId = null;

    addLog({ type: 'connection', id: connectionId, ip: req.socket.remoteAddress, action: 'connected' });

    ws.on('message', (message, isBinary) => {
      if (isBinary) {
        // Ignored. Assuming Bonvoice sends JSON messages with base64 media.
        return;
      }
      
      try {
        const data = JSON.parse(message.toString());
        addLog({ type: 'incoming_json', id: connectionId, event: data.event });

        if (data.event === 'start') {
          const { stream_id, call_id, from, to, timestamp } = data;
          currentStreamId = stream_id;
          
          store.sessions[stream_id] = {
            call_id,
            from,
            to,
            packets_received: 0,
            started_at: timestamp || new Date().toISOString(),
            stream_id
          };
          
          addLog({ type: 'start', stream_id, call_id, from, to });
          console.log(`[WS] Start Call - Stream: ${stream_id}`);
        } else if (data.event === 'media') {
          const stream_id = currentStreamId || data.stream_id;
          const session = store.sessions[stream_id];
          
          if (session) {
            session.packets_received += 1;
            
            // Extract media parts
            if (data.media && data.media.payload) {
              const base64Audio = data.media.payload;
              // Pass to process (which handles decoding and responses)
              processAudioFrame(session, base64Audio, ws);
            }
          }
        } else if (data.event === 'stop') {
           const stream_id = currentStreamId || data.stream_id;
           console.log(`[WS] Call Stopped - Stream: ${stream_id}`);
           addLog({ type: 'stop', stream_id });
           if (stream_id && store.sessions[stream_id]) {
               // Don't delete immediately so dashboard can show them, or mark as ended.
               store.sessions[stream_id].ended_at = new Date().toISOString();
           }
        } else {
           // Other events
           console.log(`[WS] Unknown Event: ${data.event}`);
        }
      } catch (e) {
        console.error(`[WS MSG ERROR] Failed to parse: ${e.message}`);
      }
    });

    ws.on('close', () => {
      console.log(`[WS] Client Disconnected | ID: ${connectionId}`);
      if (currentStreamId && store.sessions[currentStreamId]) {
         store.sessions[currentStreamId].ended_at = new Date().toISOString();
      }
      addLog({ type: 'disconnection', id: connectionId });
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
