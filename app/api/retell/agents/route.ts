import { NextRequest, NextResponse } from "next";

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function POST(req: NextRequest) {
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: "Missing RETELL_API_KEY" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { agent_name, voice_id, system_prompt, post_call_webhook_url, tools } = body;

    // 1. Create LLM
    const llmRes = await fetch("https://api.retellai.com/create-retell-llm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3.5-sonnet", // Or allow user to select this
        general_prompt: system_prompt || "You are a helpful AI assistant.",
        general_tools: tools?.map((t: any) => ({
          type: "custom",
          name: t.name,
          description: t.description,
          url: t.url,
        })) || [],
      }),
    });

    if (!llmRes.ok) {
      const errorText = await llmRes.text();
      return NextResponse.json({ error: "Failed to create LLM", details: errorText }, { status: llmRes.status });
    }

    const llmData = await llmRes.json();
    const llm_id = llmData.llm_id;
    const llm_websocket_url = llmData.llm_websocket_url;

    // 2. Create Agent
    const agentDataToCreate: any = {
      llm_websocket_url,
      voice_id,
      agent_name: agent_name || "New Agent",
    };

    if (post_call_webhook_url) {
      agentDataToCreate.post_call_analysis_data = [
        {
          type: "webhook",
          url: post_call_webhook_url,
        }
      ]
    }

    const agentRes = await fetch("https://api.retellai.com/create-agent", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentDataToCreate),
    });

    if (!agentRes.ok) {
      const errorText = await agentRes.text();
      return NextResponse.json({ error: "Failed to create Agent", details: errorText }, { status: agentRes.status });
    }

    const agentData = await agentRes.json();
    
    // Return both for the frontend
    return NextResponse.json({ 
      agent: agentData,
      llm_id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("API Error creating agent:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 });
  }
}

export async function GET() {
  if (!RETELL_API_KEY) {
    return NextResponse.json({ error: "Missing RETELL_API_KEY" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.retellai.com/list-agents", {
      headers: { "Authorization": `Bearer ${RETELL_API_KEY}` }
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch agents" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
