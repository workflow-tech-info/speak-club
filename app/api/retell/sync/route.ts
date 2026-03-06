import { NextResponse } from "next/server";

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function GET() {
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: "Missing RETELL_API_KEY" }, { status: 500 });
  }

  try {
    // Standard dashboard normalization endpoint
    // 1. Fetch Agents
    const agentsRes = await fetch("https://api.retellai.com/list-agents", {
      headers: { "Authorization": `Bearer ${RETELL_API_KEY}` }
    });
    
    // 2. Fetch Calls
    const callsRes = await fetch("https://api.retellai.com/get-calls", {
      headers: { "Authorization": `Bearer ${RETELL_API_KEY}` }
    });

    if (!agentsRes.ok || !callsRes.ok) {
      return NextResponse.json({ error: "Failed to sync Retell data" }, { status: 502 });
    }

    const rawAgents = await agentsRes.json();
    const rawCalls = await callsRes.json();

    // Map agents into our internal Client/Agent structures
    // For this generic wrapper, we'll return raw for dashboard parsing, 
    // or provide a simple mapped version.
    
    const agents = rawAgents.map((a: any) => ({
      id: a.agent_id,
      name: a.agent_name || "Unnamed Agent",
      role: "AI Voice Agent",
      status: "active",
      voiceModel: a.voice_id,
      clientName: "Internal",
      language: "English"
    }));

    const callLogs = rawCalls.map((c: any) => ({
      id: c.call_id,
      agentName: agents.find((a:any) => a.id === c.agent_id)?.name || "Unknown Agent",
      type: "phone",
      status: c.call_status === "registered" ? "completed" : c.call_status,
      duration: `${Math.floor((c.call_duration || 0) / 60)}:${String((c.call_duration || 0) % 60).padStart(2, '0')}`,
      sentiment: c.call_analysis?.agent_task_completion_rating || "neutral",
      bookingMade: !!c.call_analysis?.custom_analysis_data?.booking_status,
      transferred: false,
      time: new Date(c.start_timestamp).toLocaleDateString(),
      clientName: "Internal",
      transcript: c.transcript,
      recordingUrl: c.recording_url,
      summary: c.call_analysis?.call_summary
    }));

    return NextResponse.json({ agents, callLogs });

  } catch (error: any) {
    console.error("Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
