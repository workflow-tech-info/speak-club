function chimeWebhookHandler(req, res) {
  const event = req.body;
  
  if (!event) {
    return res.status(400).send('No event body');
  }

  // Extract relevant details for logging
  const callId = event.CallDetails?.TransactionId || 'unknown_call_id';
  const eventType = event.InvocationEventType || 'unknown_event_type';
  const fromNumber = event.CallDetails?.Participants?.[0]?.From || 'unknown_from';
  const toNumber = event.CallDetails?.Participants?.[0]?.To || 'unknown_to';

  console.log(`[WEBHOOK] Received Chime Event: ${eventType} | Call ID: ${callId} | From: ${fromNumber} | To: ${toNumber}`);

  // Return valid Chime SIP Media Application response
  res.json({
    SchemaVersion: "1.0",
    Actions: []
  });
}

module.exports = { chimeWebhookHandler };
